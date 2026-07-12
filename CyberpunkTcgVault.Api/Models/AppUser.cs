using System.ComponentModel.DataAnnotations;

namespace CyberpunkTcgVault.Api.Models
{
    public class AppUser
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string UserName { get; set; } = string.Empty;

        // PMG TO DO: Do not store Actually pasword
        // - We will use a framework hash!
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
    }
}
