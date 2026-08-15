using System.ComponentModel.DataAnnotations;

namespace CyberpunkTcgVault.Api.DTOs
{
    public class RecoveryCodeLoginRequest
    {
        [Required]
        [StringLength(100)]
        public string RecoveryCode { get; set; } = string.Empty;
    }
}
