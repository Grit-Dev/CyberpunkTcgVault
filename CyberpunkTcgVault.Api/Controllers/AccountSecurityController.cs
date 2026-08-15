using System.Text.Encodings.Web;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Options;
using CyberpunkTcgVault.Api.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.Options;

namespace CyberpunkTcgVault.Api.Controllers
{
    [Authorize(Policy = AuthorizationPolicies.AccountSecurityWrite)]
    [EnableRateLimiting(RateLimitPolicyNames.Mfa)]
    [ApiController]
    [Route("api/Account/security")]
    [ResponseCache(
        NoStore = true,
        Location = ResponseCacheLocation.None)]
    public class AccountSecurityController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly MfaOptions _mfaOptions;
        private readonly ILogger<AccountSecurityController> _logger;

        public AccountSecurityController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IOptions<MfaOptions> mfaOptions,
            ILogger<AccountSecurityController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mfaOptions = mfaOptions.Value;
            _logger = logger;
        }

        [HttpGet("mfa")]
        public async Task<ActionResult<MfaStatusResponse>> GetMfaStatus()
        {
            var user = await _userManager.GetUserAsync(User);

            if (user is null)
            {
                return Unauthorized();
            }

            var enabled = await _userManager.GetTwoFactorEnabledAsync(user);
            var recoveryCodesRemaining = enabled
                ? await _userManager.CountRecoveryCodesAsync(user)
                : 0;

            return Ok(new MfaStatusResponse
            {
                TwoFactorEnabled = enabled,
                RecoveryCodesRemaining = recoveryCodesRemaining
            });
        }

        [HttpPost("mfa/setup")]
        public async Task<ActionResult<MfaSetupResponse>> BeginMfaSetup()
        {
            var user = await _userManager.GetUserAsync(User);

            if (user is null)
            {
                return Unauthorized();
            }

            if (await _userManager.GetTwoFactorEnabledAsync(user))
            {
                return Problem(
                    statusCode: StatusCodes.Status409Conflict,
                    title: "MFA is already enabled.",
                    detail: "Reset the authenticator before starting a new setup flow.");
            }

            var key = await _userManager.GetAuthenticatorKeyAsync(user);

            if (string.IsNullOrWhiteSpace(key))
            {
                var resetResult = await _userManager.ResetAuthenticatorKeyAsync(user);

                if (!resetResult.Succeeded)
                {
                    return Problem(
                        statusCode: StatusCodes.Status500InternalServerError,
                        title: "Unable to prepare MFA setup.");
                }

                key = await _userManager.GetAuthenticatorKeyAsync(user);
            }

            if (string.IsNullOrWhiteSpace(key))
            {
                return Problem(
                    statusCode: StatusCodes.Status500InternalServerError,
                    title: "Unable to prepare MFA setup.");
            }

            var accountName = user.Email ?? user.UserName ?? user.Id.ToString();

            return Ok(new MfaSetupResponse
            {
                SharedKey = key,
                AuthenticatorUri = BuildAuthenticatorUri(
                    _mfaOptions.Issuer,
                    accountName,
                    key)
            });
        }

        [HttpPost("mfa/enable")]
        public async Task<ActionResult<MfaEnabledResponse>> EnableMfa(
            EnableMfaRequest request)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user is null)
            {
                return Unauthorized();
            }

            if (await _userManager.GetTwoFactorEnabledAsync(user))
            {
                return Problem(
                    statusCode: StatusCodes.Status409Conflict,
                    title: "MFA is already enabled.");
            }

            var key = await _userManager.GetAuthenticatorKeyAsync(user);

            if (string.IsNullOrWhiteSpace(key))
            {
                return Problem(
                    statusCode: StatusCodes.Status409Conflict,
                    title: "MFA setup has not been started.",
                    detail: "Call the MFA setup endpoint before enabling MFA.");
            }

            var codeIsValid = await _userManager.VerifyTwoFactorTokenAsync(
                user,
                _userManager.Options.Tokens.AuthenticatorTokenProvider,
                NormalizeAuthenticatorCode(request.Code));

            if (!codeIsValid)
            {
                return Problem(
                    statusCode: StatusCodes.Status400BadRequest,
                    title: "Invalid authenticator code.");
            }

            var enableResult = await _userManager.SetTwoFactorEnabledAsync(
                user,
                true);

            if (!enableResult.Succeeded)
            {
                return Problem(
                    statusCode: StatusCodes.Status500InternalServerError,
                    title: "Unable to enable MFA.");
            }

            var codeCount = Math.Clamp(
                _mfaOptions.RecoveryCodeCount,
                1,
                20);

            var recoveryCodes = await _userManager
                .GenerateNewTwoFactorRecoveryCodesAsync(user, codeCount);

            _logger.LogInformation(
                "Security event: MFA enabled for user {UserId}.",
                user.Id);

            return Ok(new MfaEnabledResponse
            {
                TwoFactorEnabled = true,
                RecoveryCodes = recoveryCodes?.ToArray() ?? []
            });
        }

        [HttpPost("mfa/recovery-codes")]
        public async Task<ActionResult<RecoveryCodesResponse>> RegenerateRecoveryCodes(
            MfaProtectedChangeRequest request)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user is null)
            {
                return Unauthorized();
            }

            if (!await _userManager.GetTwoFactorEnabledAsync(user))
            {
                return Problem(
                    statusCode: StatusCodes.Status409Conflict,
                    title: "MFA is not enabled.");
            }

            if (!await ValidatePasswordAndAuthenticatorAsync(user, request))
            {
                return Problem(
                    statusCode: StatusCodes.Status400BadRequest,
                    title: "Security verification failed.");
            }

            var codeCount = Math.Clamp(
                _mfaOptions.RecoveryCodeCount,
                1,
                20);

            var recoveryCodes = await _userManager
                .GenerateNewTwoFactorRecoveryCodesAsync(user, codeCount);

            return Ok(new RecoveryCodesResponse
            {
                RecoveryCodes = recoveryCodes?.ToArray() ?? []
            });
        }

        [HttpPost("mfa/disable")]
        public async Task<IActionResult> DisableMfa(
            MfaProtectedChangeRequest request)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user is null)
            {
                return Unauthorized();
            }

            if (!await _userManager.GetTwoFactorEnabledAsync(user))
            {
                return Problem(
                    statusCode: StatusCodes.Status409Conflict,
                    title: "MFA is not enabled.");
            }

            if (!await ValidatePasswordAndAuthenticatorAsync(user, request))
            {
                return Problem(
                    statusCode: StatusCodes.Status400BadRequest,
                    title: "Security verification failed.");
            }

            var disableResult = await _userManager.SetTwoFactorEnabledAsync(
                user,
                false);

            if (!disableResult.Succeeded)
            {
                return Problem(
                    statusCode: StatusCodes.Status500InternalServerError,
                    title: "Unable to disable MFA.");
            }

            // End the current cookie session immediately after disabling MFA.
            // In particular, an Admin session carrying amr=mfa must not remain
            // usable if resetting the old authenticator key then fails.
            await _signInManager.SignOutAsync();

            var resetResult = await _userManager.ResetAuthenticatorKeyAsync(user);

            if (!resetResult.Succeeded)
            {
                return Problem(
                    statusCode: StatusCodes.Status500InternalServerError,
                    title: "Unable to reset authenticator state.");
            }

            _logger.LogInformation(
                "Security event: MFA disabled for user {UserId}.",
                user.Id);

            return NoContent();
        }

        [HttpPost("mfa/reset")]
        public async Task<IActionResult> ResetMfa(
            ResetMfaRequest request)
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

            var twoFactorEnabled =
                await _userManager.GetTwoFactorEnabledAsync(user);

            if (twoFactorEnabled &&
                !await ValidateResetSecondFactorAsync(user, request))
            {
                return Problem(
                    statusCode: StatusCodes.Status400BadRequest,
                    title: "Security verification failed.",
                    detail: "A valid authenticator code or recovery code is required to reset enabled MFA.");
            }

            if (twoFactorEnabled)
            {
                var disableResult = await _userManager.SetTwoFactorEnabledAsync(
                    user,
                    false);

                if (!disableResult.Succeeded)
                {
                    return Problem(
                        statusCode: StatusCodes.Status500InternalServerError,
                        title: "Unable to reset MFA.");
                }

                // Once enabled MFA has been turned off, invalidate the current
                // cookie before doing any further cleanup so a prior amr=mfa
                // session cannot survive a later key-reset failure.
                await _signInManager.SignOutAsync();
            }

            var resetResult = await _userManager.ResetAuthenticatorKeyAsync(user);

            if (!resetResult.Succeeded)
            {
                return Problem(
                    statusCode: StatusCodes.Status500InternalServerError,
                    title: "Unable to reset MFA.");
            }

            if (!twoFactorEnabled)
            {
                // Abandoned setup keys can also be reset. End the current
                // session after the reset to keep the contract consistent.
                await _signInManager.SignOutAsync();
            }

            _logger.LogInformation(
                "Security event: MFA authenticator reset for user {UserId}.",
                user.Id);

            return NoContent();
        }

        private async Task<bool> ValidateResetSecondFactorAsync(
            AppUser user,
            ResetMfaRequest request)
        {
            if (!string.IsNullOrWhiteSpace(request.AuthenticatorCode))
            {
                return await _userManager.VerifyTwoFactorTokenAsync(
                    user,
                    _userManager.Options.Tokens.AuthenticatorTokenProvider,
                    NormalizeAuthenticatorCode(request.AuthenticatorCode));
            }

            if (!string.IsNullOrWhiteSpace(request.RecoveryCode))
            {
                // Recovery codes are intentionally one-time. Redeeming one
                // here proves possession of the fallback second factor before
                // the existing authenticator is reset.
                var result = await _userManager.RedeemTwoFactorRecoveryCodeAsync(
                    user,
                    request.RecoveryCode.Trim());

                return result.Succeeded;
            }

            return false;
        }

        private async Task<bool> ValidatePasswordAndAuthenticatorAsync(
            AppUser user,
            MfaProtectedChangeRequest request)
        {
            var passwordIsValid = await _userManager.CheckPasswordAsync(
                user,
                request.CurrentPassword);

            if (!passwordIsValid)
            {
                return false;
            }

            return await _userManager.VerifyTwoFactorTokenAsync(
                user,
                _userManager.Options.Tokens.AuthenticatorTokenProvider,
                NormalizeAuthenticatorCode(request.Code));
        }

        private static string NormalizeAuthenticatorCode(string code)
        {
            return code
                .Replace(" ", string.Empty)
                .Replace("-", string.Empty);
        }

        private static string BuildAuthenticatorUri(
            string issuer,
            string accountName,
            string key)
        {
            var encodedIssuer = UrlEncoder.Default.Encode(issuer);
            var encodedAccountName = UrlEncoder.Default.Encode(accountName);

            return $"otpauth://totp/{encodedIssuer}:{encodedAccountName}?secret={key}&issuer={encodedIssuer}&digits=6";
        }
    }
}
