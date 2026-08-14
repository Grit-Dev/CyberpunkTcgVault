namespace CyberpunkTcgVault.Api.Models
{
    public class OwnedCard
    {
        public int Id { get; set; }

        // Foreign key to the user who owns this card.
        public Guid UserId { get; set; }

        // Foreign key to the exact physical card printing that is owned.
        public int CardPrintingId { get; set; }

        // Navigation property to the exact physical card printing.
        public CardPrinting CardPrinting { get; set; } = null!;

        // Navigation property back to the owner.
        public AppUser User { get; set; } = null!;

        public int QuantityOwned { get; set; }

        public string? Condition { get; set; }

        public bool IsInMasterCollection { get; set; }

        public bool IsDuplicate { get; set; }

        public bool IsGradingCandidate { get; set; }

        public bool IsOpenForTrade { get; set; }

        public bool IsOpenToMessages { get; set; }

        public bool MaySellLater { get; set; }

        public string? Notes { get; set; }
    }
}
