namespace CyberpunkTcgVault.Api.DTOs
{
    public class CardResponse
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string? Colour { get; set; }

        public string? CardType { get; set; }

        public string? Classification { get; set; }

        public string? Keywords { get; set; }

        public int? Cost { get; set; }

        public int? Power { get; set; }

        public int? RamCost { get; set; }

        public bool IsLegend { get; set; }

        public string? Notes { get; set; }

        // Primary-printing fields are kept flattened for the existing frontend.
        // The full printing list below is the source of truth for multi-printing cards.
        public int? CardPrintingId { get; set; }

        public string? SetName { get; set; }

        public string? Rarity { get; set; }

        public bool HasBetaSymbol { get; set; }

        public bool IsKickstarterVersion { get; set; }

        public bool IsRetailVersion { get; set; }

        public bool IsFoil { get; set; }

        public bool IsAltArt { get; set; }

        public bool IsBoxTopper { get; set; }

        public bool IsPromo { get; set; }

        public bool IsStarterDeckExclusive { get; set; }

        public string? CardNumber { get; set; }

        public string? ImageUrl { get; set; }

        public IReadOnlyCollection<CardPrintingResponse> Printings { get; set; } = [];
    }
}
