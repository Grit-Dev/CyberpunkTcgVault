namespace CyberpunkTcgVault.Api.DTOs
{
    public class OwnedCardResponse
    {
        public int Id { get; set; }

        public int CardPrintingId { get; set; }

        public int CardId { get; set; }

        public string CardName { get; set; } = string.Empty;

        public string? SetName { get; set; }

        public string? CardNumber { get; set; }

        public string? Rarity { get; set; }

        public string? Colour { get; set; }

        public string? ImageUrl { get; set; }

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
