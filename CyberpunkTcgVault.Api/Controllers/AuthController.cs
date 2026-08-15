using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Options;
using CyberpunkTcgVault.Api.Security;
using CyberpunkTcgVault.Api.Services.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace CyberpunkTcgVault.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [ResponseCache(
        NoStore = true,
        Location = ResponseCacheLocation.None)]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ProductCapabilitiesOptions _capabilities;
        private readonly IDemoVaultService _demoVaultService;

        public AuthController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IOptions<ProductCapabilitiesOptions> options,
            IDemoVaultService demoVaultService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _capabilities = options.Value;
            _demoVaultService = demoVaultService;
        }

        // Angular calls this before unsafe requests. The response token is
        // not an authentication credential; it is the request half of the
        // ASP.NET Core antiforgery token pair.
        [AllowAnonymous]
        [HttpGet("csrf")]
        public ActionResult<CsrfTokenResponse> GetCsrfToken(
            [FromServices] IAntiforgery antiforgery)
        {
            var tokenSet = antiforgery.GetAndStoreTokens(HttpContext);

            if (string.IsNullOrWhiteSpace(tokenSet.RequestToken))
            {
                return Problem(
                    statusCode: StatusCodes.Status500InternalServerError,
                    title: "Unable to create an antiforgery token.");
            }

            return Ok(new CsrfTokenResponse
            {
                RequestToken = tokenSet.RequestToken
            });
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<AuthUserResponse>> GetCurrentUser()
        {
            var user = await _userManager.GetUserAsync(User);

            if (user is null)
            {
                return Unauthorized();
            }

            return Ok(await CreateAuthUserResponse(user));
        }

        [AllowAnonymous]
        [EnableRateLimiting(RateLimitPolicyNames.Registration)]
        [HttpPost("register")]
        public async Task<IActionResult> Register(
            RegisterUserRequest request)
        {
            if (!_capabilities.PublicRegistrationEnabled)
            {
                return Problem(
                    statusCode: StatusCodes.Status404NotFound,
                    title: "Public registration is not available.");
            }

            var userName = request.UserName?.Trim() ?? string.Empty;

            var userNameValidation = ValidateRegistrationUserName(userName);

            if (userNameValidation is not null)
            {
                return BadRequest(new ValidationProblemDetails(
                    new Dictionary<string, string[]>
                    {
                        [nameof(RegisterUserRequest.UserName)] =
                            [userNameValidation]
                    })
                {
                    Title = "Registration validation failed.",
                    Status = StatusCodes.Status400BadRequest
                });
            }

            var user = new AppUser
            {
                UserName = userName,
                Email = request.Email?.Trim()
            };

            IdentityResult result;

            try
            {
                result = await _userManager.CreateAsync(
                    user,
                    request.Password);
            }
            catch (DbUpdateException exception)
                when (IsUniqueAccountConstraintViolation(exception))
            {
                // UserManager performs friendly duplicate validation, but a
                // database unique index is still required for concurrent
                // requests. Map that race to the same deliberate 409 contract.
                return AccountAlreadyExists();
            }

            if (!result.Succeeded)
            {
                var duplicateAccount = result.Errors.Any(error =>
                    error.Code == "DuplicateUserName" ||
                    error.Code == "DuplicateEmail");

                if (duplicateAccount)
                {
                    return AccountAlreadyExists();
                }

                return BadRequest(new ValidationProblemDetails(
                    result.Errors
                        .GroupBy(error => error.Code)
                        .ToDictionary(
                            group => group.Key,
                            group => group
                                .Select(error => error.Description)
                                .ToArray()))
                {
                    Title = "Registration validation failed.",
                    Status = StatusCodes.Status400BadRequest
                });
            }

            var roleResult = await _userManager.AddToRoleAsync(
                user,
                AppRoles.User);

            if (!roleResult.Succeeded)
            {
                await _userManager.DeleteAsync(user);

                return Problem(
                    statusCode: StatusCodes.Status500InternalServerError,
                    title: "Unable to complete registration.");
            }

            return StatusCode(
                StatusCodes.Status201Created,
                new
                {
                    message = "User registered successfully."
                });
        }

        [AllowAnonymous]
        [EnableRateLimiting(RateLimitPolicyNames.Login)]
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login(
            LoginUserRequest request)
        {
            var user = await _userManager.FindByEmailAsync(
                request.Email.Trim());

            if (user is null)
            {
                return InvalidLogin();
            }

            var result = await _signInManager.PasswordSignInAsync(
                user,
                request.Password,
                isPersistent: false,
                lockoutOnFailure: true);

            if (result.RequiresTwoFactor)
            {
                // Password validation succeeded, but Identity has only stored
                // its temporary two-factor user cookie. The final application
                // authentication cookie is not created until MFA succeeds.
                return Ok(new LoginResponse
                {
                    RequiresTwoFactor = true
                });
            }

            // Do not reveal whether the account is locked, disallowed, or the
            // password was wrong. All remain the same public response.
            if (result.IsLockedOut || result.IsNotAllowed || !result.Succeeded)
            {
                return InvalidLogin();
            }

            return Ok(new LoginResponse
            {
                RequiresTwoFactor = false,
                User = await CreateAuthUserResponse(user)
            });
        }

        [AllowAnonymous]
        [EnableRateLimiting(RateLimitPolicyNames.Mfa)]
        [HttpPost("mfa")]
        public async Task<ActionResult<AuthUserResponse>> CompleteMfaLogin(
            TwoFactorLoginRequest request)
        {
            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();

            if (user is null)
            {
                return Unauthorized(new ProblemDetails
                {
                    Status = StatusCodes.Status401Unauthorized,
                    Title = "No MFA login is in progress."
                });
            }

            var result = await _signInManager.TwoFactorAuthenticatorSignInAsync(
                NormalizeAuthenticatorCode(request.Code),
                isPersistent: false,
                rememberClient: false);

            if (result.IsLockedOut || !result.Succeeded)
            {
                return Unauthorized(new ProblemDetails
                {
                    Status = StatusCodes.Status401Unauthorized,
                    Title = "Invalid authenticator code."
                });
            }

            return Ok(await CreateAuthUserResponse(user));
        }

        [AllowAnonymous]
        [EnableRateLimiting(RateLimitPolicyNames.Mfa)]
        [HttpPost("mfa/recovery")]
        public async Task<ActionResult<AuthUserResponse>> CompleteRecoveryCodeLogin(
            RecoveryCodeLoginRequest request)
        {
            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();

            if (user is null)
            {
                return Unauthorized(new ProblemDetails
                {
                    Status = StatusCodes.Status401Unauthorized,
                    Title = "No MFA login is in progress."
                });
            }

            var result = await _signInManager.TwoFactorRecoveryCodeSignInAsync(
                request.RecoveryCode.Trim());

            if (!result.Succeeded)
            {
                return Unauthorized(new ProblemDetails
                {
                    Status = StatusCodes.Status401Unauthorized,
                    Title = "Invalid recovery code."
                });
            }

            return Ok(await CreateAuthUserResponse(user));
        }

        [AllowAnonymous]
        [EnableRateLimiting(RateLimitPolicyNames.Demo)]
        [HttpPost("demo")]
        public async Task<ActionResult<AuthUserResponse>> DemoLogin(
            [FromServices] IOptions<DemoUserOptions> demoOptions)
        {
            if (!_capabilities.DemoAccessEnabled)
            {
                return Problem(
                    statusCode: StatusCodes.Status404NotFound,
                    title: "Demo access is not available.");
            }

            var demoUser = await _userManager.FindByEmailAsync(
                demoOptions.Value.Email.Trim());

            if (demoUser is null ||
                !await _userManager.IsInRoleAsync(
                    demoUser,
                    AppRoles.Demo))
            {
                return Problem(
                    statusCode: StatusCodes.Status503ServiceUnavailable,
                    title: "Demo access is temporarily unavailable.");
            }

            // Reset immediately before sign-in so a reviewer begins from a
            // predictable collector baseline without exposing a public reset
            // endpoint. Only the configured Demo user's rows are touched.
            await _demoVaultService.ResetDemoCollectorDataAsync(
                demoUser.Id,
                HttpContext.RequestAborted);

            await _signInManager.SignOutAsync();
            await _signInManager.SignInAsync(
                demoUser,
                isPersistent: false);

            return Ok(await CreateAuthUserResponse(demoUser));
        }


        [AllowAnonymous]
        [EnableRateLimiting(RateLimitPolicyNames.PasswordReset)]
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(
            ForgotPasswordRequest request,
            [FromServices] IPasswordResetEmailSender emailSender,
            [FromServices] IOptions<PasswordResetOptions> passwordResetOptions,
            [FromServices] ILogger<AuthController> logger)
        {
            const string publicMessage =
                "If an account exists for that email, a password reset link has been sent.";

            var email = request.Email?.Trim() ?? string.Empty;

            // Keep the public response identical so callers cannot use this
            // endpoint to discover which email addresses are registered.
            if (email.Length == 0)
            {
                return Accepted(new { message = publicMessage });
            }

            var user = await _userManager.FindByEmailAsync(email);

            if (user is null ||
                await _userManager.IsInRoleAsync(user, AppRoles.Demo))
            {
                return Accepted(new { message = publicMessage });
            }

            var token =
                await _userManager.GeneratePasswordResetTokenAsync(user);

            var resetUrl = QueryHelpers.AddQueryString(
                passwordResetOptions.Value.FrontendResetUrl,
                new Dictionary<string, string?>
                {
                    ["userId"] = user.Id.ToString(),
                    ["token"] = token
                });

            try
            {
                await emailSender.SendPasswordResetAsync(
                    user.Email ?? email,
                    resetUrl,
                    HttpContext.RequestAborted);
            }
            catch (Exception exception)
            {
                // Do not expose mail-provider/configuration failures to the
                // anonymous caller. Operations can investigate the server log.
                logger.LogError(
                    exception,
                    "Unable to deliver a password reset email.");
            }

            return Accepted(new { message = publicMessage });
        }

        [AllowAnonymous]
        [EnableRateLimiting(RateLimitPolicyNames.PasswordReset)]
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(
            ResetPasswordRequest request)
        {
            var token = request.Token?.Trim() ?? string.Empty;

            if (request.UserId == Guid.Empty || token.Length == 0)
            {
                return InvalidPasswordReset();
            }

            var user = await _userManager.FindByIdAsync(
                request.UserId.ToString());

            if (user is null ||
                await _userManager.IsInRoleAsync(user, AppRoles.Demo))
            {
                return InvalidPasswordReset();
            }

            var result = await _userManager.ResetPasswordAsync(
                user,
                token,
                request.NewPassword);

            if (!result.Succeeded)
            {
                var passwordErrors = result.Errors
                    .Where(error =>
                        error.Code.StartsWith(
                            "Password",
                            StringComparison.OrdinalIgnoreCase))
                    .Select(error => error.Description)
                    .ToArray();

                if (passwordErrors.Length > 0)
                {
                    return BadRequest(new ValidationProblemDetails(
                        new Dictionary<string, string[]>
                        {
                            [nameof(ResetPasswordRequest.NewPassword)] =
                                passwordErrors
                        })
                    {
                        Title = "Password reset validation failed.",
                        Status = StatusCodes.Status400BadRequest
                    });
                }

                return InvalidPasswordReset();
            }

            return NoContent();
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return NoContent();
        }

        private ObjectResult AccountAlreadyExists()
        {
            return Problem(
                statusCode: StatusCodes.Status409Conflict,
                title: "Account already exists.",
                detail: "An account with those details already exists.");
        }

        private static string? ValidateRegistrationUserName(string userName)
        {
            if (userName.Length == 0)
            {
                return "Username is required.";
            }

            if (userName.Length < 3 || userName.Length > 20)
            {
                return "Username must be between 3 and 20 characters.";
            }

            if (userName.Contains('@'))
            {
                return "Username must be separate from the email address and cannot contain '@'.";
            }

            if (userName.Any(char.IsWhiteSpace))
            {
                return "Username cannot contain whitespace.";
            }

            return null;
        }

        private static bool IsUniqueAccountConstraintViolation(
            DbUpdateException exception)
        {
            return exception.GetBaseException() is SqlException sqlException
                && sqlException.Number is 2601 or 2627;
        }


        private BadRequestObjectResult InvalidPasswordReset()
        {
            return BadRequest(new ProblemDetails
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Invalid or expired password reset request."
            });
        }

        private UnauthorizedObjectResult InvalidLogin()
        {
            return Unauthorized(new ProblemDetails
            {
                Status = StatusCodes.Status401Unauthorized,
                Title = "Invalid email or password."
            });
        }

        private async Task<AuthUserResponse> CreateAuthUserResponse(
            AppUser user)
        {
            var roles = await _userManager.GetRolesAsync(user);

            return new AuthUserResponse
            {
                UserId = user.Id,
                UserName = user.UserName ?? string.Empty,
                Email = user.Email ?? string.Empty,
                Roles = roles.ToArray(),
                EmailConfirmed = user.EmailConfirmed,
                TwoFactorEnabled = user.TwoFactorEnabled
            };
        }

        private static string NormalizeAuthenticatorCode(string code)
        {
            return code
                .Replace(" ", string.Empty)
                .Replace("-", string.Empty);
        }
    }
}
