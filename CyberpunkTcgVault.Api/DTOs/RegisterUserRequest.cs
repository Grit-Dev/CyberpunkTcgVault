using System.ComponentModel.DataAnnotations;

namespace CyberpunkTcgVault.Api.DTOs
{
    public class RegisterUserRequest
    {
        [Required]
        [StringLength(50)]
        public string UserName { get; set; } = string.Empty;

        [Required]
        [StringLength(50, MinimumLength = 6)]
        public string Password { get; set; } = string.Empty;
    }
}
