using System.ComponentModel.DataAnnotations;

namespace CyberpunkTcgVault.Api.DTOs
{
    public class EnableMfaRequest
    {
        [Required]
        [StringLength(20)]
        public string Code { get; set; } = string.Empty;
    }
}
