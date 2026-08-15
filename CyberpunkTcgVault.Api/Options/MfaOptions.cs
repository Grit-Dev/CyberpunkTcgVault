namespace CyberpunkTcgVault.Api.Options
{
    public class MfaOptions
    {
        public const string SectionName = "Mfa";

        public string Issuer { get; set; } = "Choom Vault";

        public int RecoveryCodeCount { get; set; } = 10;
    }
}
