namespace CyberpunkTcgVault.Api.DTOs
{
    public class MfaStatusResponse
    {
        public bool TwoFactorEnabled { get; set; }

        public int RecoveryCodesRemaining { get; set; }
    }
}
