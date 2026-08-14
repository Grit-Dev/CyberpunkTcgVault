namespace CyberpunkTcgVault.Api.Models
{
    public class CardPrinting
    {
        public int Id { get; set; }

        public int CardId { get; set; }

        public int CardSetId { get; set; }

        public Card Card { get; set; } = null!;

        public CardSet CardSet { get; set; } = null!;

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

        public ICollection<OwnedCard> OwnedCards { get; set; } = [];

        public ICollection<WishListItem> WishListItems { get; set; } = [];
    }
}
