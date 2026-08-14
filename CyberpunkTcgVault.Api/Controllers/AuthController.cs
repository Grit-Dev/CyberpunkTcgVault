using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Options;
using CyberpunkTcgVault.Api.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace CyberpunkTcgVault.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ProductCapabilitiesOptions _capabilities;

        public AuthController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IOptions<ProductCapabilitiesOptions> options)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _capabilities = options.Value;
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

            var response = await CreateAuthUserResponse(user);

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(
            RegisterUserRequest request)
        {
            if (!_capabilities.PublicRegistrationEnabled)
            {
                return NotFound(new
                {
                    message = "Public registration is not available."
                });
            }

            var user = new AppUser
            {
                UserName = request.UserName.Trim(),
                Email = request.Email.Trim()
            };

            var result = await _userManager.CreateAsync(
                user,
                request.Password);

            if (!result.Succeeded)
            {
                var duplicateAccount = result.Errors.Any(error =>
                    error.Code == "DuplicateUserName" ||
                    error.Code == "DuplicateEmail");

                if (duplicateAccount)
                {
                    return Conflict(new
                    {
                        message = "An account with those details already exists."
                    });
                }

                return BadRequest(new
                {
                    errors = result.Errors
                        .Select(error => error.Description)
                });
            }

            var roleResult = await _userManager.AddToRoleAsync(
                user,
                AppRoles.User);

            if (!roleResult.Succeeded)
            {
                await _userManager.DeleteAsync(user);

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new
                    {
                        message = "Unable to complete registration."
                    });
            }

            return StatusCode(
                StatusCodes.Status201Created,
                new
                {
                    message = "User registered successfully."
                });
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<AuthUserResponse>> Login(
            LoginUserRequest request)
        {
            var user = await _userManager.FindByEmailAsync(
                request.Email.Trim());

            if (user is null)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password."
                });
            }

            var result = await _signInManager.PasswordSignInAsync(
                user,
                request.Password,
                isPersistent: false,
                lockoutOnFailure: true);

            if (result.RequiresTwoFactor)
            {
                return Unauthorized(new
                {
                    message = "Two-factor authentication is required.",

                    requiresTwoFactor = true
                });
            }

            if (result.IsLockedOut)
            {
                return Unauthorized(new
                {
                    message = "Unable to sign in. Please try again later."
                });
            }

            if (!result.Succeeded)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password."
                });
            }

            var response = await CreateAuthUserResponse(user);

            return Ok(response);
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return NoContent();
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
    }
}