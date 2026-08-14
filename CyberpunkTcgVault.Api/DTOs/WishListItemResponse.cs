namespace CyberpunkTcgVault.Api.DTOs
{
    public class WishListItemResponse
    {
        public int Id { get; set; }

        public int CardPrintingId { get; set; }

        public int CardId { get; set; }

        public string CardName { get; set; } = string.Empty;

        public string? SetName { get; set; }

        public string? CardNumber { get; set; }

        public string? Rarity { get; set; }

        public string? Colour { get; set; }

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
