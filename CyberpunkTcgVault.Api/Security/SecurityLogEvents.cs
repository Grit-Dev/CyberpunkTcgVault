using Microsoft.Extensions.Logging;

namespace CyberpunkTcgVault.Api.Security
{
    /// <summary>
    /// Stable event IDs for security-relevant application logs.
    /// These make it easier to search/filter hosted logs without recording
    /// passwords, cookies, tokens, request bodies or secrets.
    /// </summary>
    public static class SecurityLogEvents
    {
        public static readonly EventId RateLimitExceeded =
            new(1001, nameof(RateLimitExceeded));

        public static readonly EventId LoginFailed =
            new(1002, nameof(LoginFailed));

        public static readonly EventId RegistrationSucceeded =
            new(1004, nameof(RegistrationSucceeded));

        public static readonly EventId AuthorizationDenied =
            new(1005, nameof(AuthorizationDenied));

        public static readonly EventId DemoLoginSucceeded =
            new(1006, nameof(DemoLoginSucceeded));

        public static readonly EventId AccountDeleted =
            new(1007, nameof(AccountDeleted));

        public static readonly EventId DemoVaultReset =
            new(1008, nameof(DemoVaultReset));

        public static readonly EventId LoginPrimaryAuthenticationAccepted =
            new(1009, nameof(LoginPrimaryAuthenticationAccepted));

        public static readonly EventId MfaLoginSucceeded =
            new(1010, nameof(MfaLoginSucceeded));

        public static readonly EventId MfaLoginFailed =
            new(1011, nameof(MfaLoginFailed));
    }
}
