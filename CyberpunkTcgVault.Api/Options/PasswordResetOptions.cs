namespace CyberpunkTcgVault.Api.Options
{
    public class PasswordResetOptions
    {
        public const string SectionName = "PasswordReset";

        // Angular route that accepts the email + token query string.
        public string FrontendResetUrl { get; set; } =
            "https://localhost:4200/reset-password";

        // Keep the API key in user-secrets / Azure configuration, never source.
        public string ResendApiKey { get; set; } = string.Empty;

        // Must be a sender on a domain verified with the email provider.
        public string FromEmail { get; set; } = string.Empty;
    }
}
