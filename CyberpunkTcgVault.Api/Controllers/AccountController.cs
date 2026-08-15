using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CyberpunkTcgVault.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    [ResponseCache(
        NoStore = true,
        Location = ResponseCacheLocation.None)]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ILogger<AccountController> _logger;

        public AccountController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            ILogger<AccountController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }

        [Authorize(Policy = AuthorizationPolicies.AccountDelete)]
        [HttpDelete]
        public async Task<IActionResult> DeleteAccount(
            DeleteAccountRequest request)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user is null)
            {
                return Unauthorized();
            }

            var passwordIsValid = await _userManager.CheckPasswordAsync(
                user,
                request.CurrentPassword);

            if (!passwordIsValid)
            {
                return Problem(
                    statusCode: StatusCodes.Status400BadRequest,
                    title: "Security verification failed.");
            }

            if (await _userManager.GetTwoFactorEnabledAsync(user))
            {
                if (string.IsNullOrWhiteSpace(request.AuthenticatorCode))
                {
                    return Problem(
                        statusCode: StatusCodes.Status400BadRequest,
                        title: "Authenticator code is required.");
                }

                var code = request.AuthenticatorCode
                    .Replace(" ", string.Empty)
                    .Replace("-", string.Empty);

                var codeIsValid = await _userManager.VerifyTwoFactorTokenAsync(
                    user,
                    _userManager.Options.Tokens.AuthenticatorTokenProvider,
                    code);

                if (!codeIsValid)
                {
                    return Problem(
                        statusCode: StatusCodes.Status400BadRequest,
                        title: "Security verification failed.");
                }
            }

            // OwnedCards, WishList, CollectionProducts and Identity-owned
            // records all have required UserId foreign keys with cascade
            // deletion. UserManager.DeleteAsync therefore removes the user
            // and their private account data together at database level.
            var deleteResult = await _userManager.DeleteAsync(user);

            if (!deleteResult.Succeeded)
            {
                _logger.LogError(
                    "Account deletion failed after Identity returned {ErrorCount} errors.",
                    deleteResult.Errors.Count());

                return Problem(
                    statusCode: StatusCodes.Status500InternalServerError,
                    title: "Unable to delete the account.");
            }

            await _signInManager.SignOutAsync();

            _logger.LogInformation(
                SecurityLogEvents.AccountDeleted,
                "Security event: account deletion completed successfully.");

            return NoContent();
        }
    }
}
