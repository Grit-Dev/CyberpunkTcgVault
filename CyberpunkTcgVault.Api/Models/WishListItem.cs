using System.ComponentModel.DataAnnotations;

namespace CyberpunkTcgVault.Api.Models
{
    public class WishListItem
    {
        public int Id { get; set; }

        // Foreign key to the Cards table.
        public int CardId { get; set; }

        // Navigation property. Lets EF Core load the related Card.
        public Card Card { get; set; } = null!;

        public int WantedQuantity { get; set; }

        public string? Priority { get; set; }

        public string? ReasonWanted { get; set; }

        public bool WantRaw { get; set; }

        public bool WantGraded { get; set; }

        public string? PreferredGradingCompany { get; set; }

        public bool IsOpenToTrade { get; set; }

        public string? Notes { get; set; }
    }
}
