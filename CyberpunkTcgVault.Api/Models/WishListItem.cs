namespace CyberpunkTcgVault.Api.Models
{
    public class WishListItem
    {
        public int Id { get; set; }

        public int CardPrintingId { get; set; }

        public CardPrinting CardPrinting { get; set; } = null!;

        // Foreign key to the user who owns this wishlist item.
        public Guid UserId { get; set; }

        // Navigation property back to the owning user.
        public AppUser User { get; set; } = null!;

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
