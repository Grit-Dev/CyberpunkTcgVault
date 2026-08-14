namespace CyberpunkTcgVault.Api.DTOs
{
    public class CardPrintingResponse
    {
        public int Id { get; set; }

        public int CardSetId { get; set; }

        public string SetName { get; set; } = string.Empty;

        public string? SetCode { get; set; }

        public string CardNumber { get; set; } = string.Empty;

        public string? Rarity { get; set; }

        public string? ImageUrl { get; set; }

        public string? LanguageCode { get; set; }

        public bool HasBetaSymbol { get; set; }

        public bool IsKickstarterVersion { get; set; }

        public bool IsRetailVersion { get; set; }

        public bool IsFoil { get; set; }

        public bool IsAltArt { get; set; }

        public bool IsBoxTopper { get; set; }

        public bool IsPromo { get; set; }

        public bool IsStarterDeckExclusive { get; set; }
    }
}
