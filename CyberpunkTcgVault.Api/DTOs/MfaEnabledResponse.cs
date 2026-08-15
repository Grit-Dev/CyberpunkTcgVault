namespace CyberpunkTcgVault.Api.DTOs
{
    public class MfaEnabledResponse
    {
        public bool TwoFactorEnabled { get; set; }

        public string[] RecoveryCodes { get; set; } = [];
    }
}
