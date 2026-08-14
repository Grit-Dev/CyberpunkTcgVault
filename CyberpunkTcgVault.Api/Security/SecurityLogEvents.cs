using Microsoft.Extensions.Logging;

namespace CyberpunkTcgVault.Api.Security
{
    /// <summary>
    /// Stable event IDs for security-relevant application logs.
    /// These make it easier to search/filter security events in hosted logs
    /// without logging passwords, cookies, tokens, request bodies or secrets.
    /// </summary>
    public static class SecurityLogEvents
    {
        public static readonly EventId RateLimitExceeded =
            new(1001, nameof(RateLimitExceeded));

        public static readonly EventId LoginFailed =
            new(1002, nameof(LoginFailed));

        public static readonly EventId LoginSucceeded =
            new(1003, nameof(LoginSucceeded));

        public static readonly EventId RegistrationSucceeded =
            new(1004, nameof(RegistrationSucceeded));

        public static readonly EventId AuthorizationDenied =
            new(1005, nameof(AuthorizationDenied));
    }
}
