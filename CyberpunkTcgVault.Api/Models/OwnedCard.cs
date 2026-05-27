namespace CyberpunkTcgVault.Api.Models
{
    public class OwnedCard
    {
        public int Id { get; set; }

        // foreign key to the Card table
        public int CardId { get; set; }

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
