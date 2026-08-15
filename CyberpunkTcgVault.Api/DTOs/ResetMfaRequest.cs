using System.ComponentModel.DataAnnotations;

namespace CyberpunkTcgVault.Api.DTOs
{
    public class ResetMfaRequest
    {
        [Required]
        [StringLength(128, MinimumLength = 8)]
        public string CurrentPassword { get; set; } = string.Empty;

        [StringLength(20)]
        public string? AuthenticatorCode { get; set; }

        [StringLength(100)]
        public string? RecoveryCode { get; set; }
    }
}
