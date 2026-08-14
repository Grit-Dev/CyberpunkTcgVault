using Microsoft.AspNetCore.Identity;

namespace CyberpunkTcgVault.Api.Models
{
    public class AppUser : IdentityUser<Guid>
    {
        // Navigation property.
        // The user can have many owned cards linked to their account.
        public ICollection<OwnedCard> OwnedCards { get; set; } = [];

        // Navigation property.
        // The user can have many wishlist items on their account 
        public ICollection<WishListItem> WishListitems { get; set; } = [];

        // Navigation property.
        // The user can have many Product items on their account 
        public ICollection<CollectionProduct> CollectionProducts { get; set; } = [];
    }
}
