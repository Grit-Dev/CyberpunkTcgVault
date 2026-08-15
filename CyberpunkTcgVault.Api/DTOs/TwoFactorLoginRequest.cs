using System.ComponentModel.DataAnnotations;

namespace CyberpunkTcgVault.Api.DTOs
{
    public class TwoFactorLoginRequest
    {
        [Required]
        [StringLength(20)]
        public string Code { get; set; } = string.Empty;
    }
}
