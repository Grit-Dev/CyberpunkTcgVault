using System.ComponentModel.DataAnnotations;

namespace CyberpunkTcgVault.Api.Models
{
    public class AppUser
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(50)]
        public string UserName { get; set; } = string.Empty;

        // Do not store Actually pasword
        // - We will use a framework hash!
        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        // Navigation property.
        // The user can have many owned cards linked to their account.
        public ICollection<OwnedCard> OwnedCards { get; set; } = [];

        // Navigation property.
        // The user can have many wishlist itemns on their account 
        public ICollection<WishListItem> WishListitems { get; set; } = [];
    }
}
