namespace CyberpunkTcgVault.Api.Models
{
    public class OwnedCard
    {
        public int Id { get; set; }

        //Foriegn Key to the user who owns this card
        public Guid UserId { get; set; }    

        // foreign key to the Card table
        public int CardId { get; set; }

        // Navigation property back to the owner
        public AppUser User { get; set; } = null!;

        // navigation property to the related Card entity
        public Card Card { get; set; } = null!;

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
