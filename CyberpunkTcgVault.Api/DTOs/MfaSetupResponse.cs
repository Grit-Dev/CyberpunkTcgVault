namespace CyberpunkTcgVault.Api.DTOs
{
    public class MfaSetupResponse
    {
        public string SharedKey { get; set; } = string.Empty;

        public string AuthenticatorUri { get; set; } = string.Empty;
    }
}
