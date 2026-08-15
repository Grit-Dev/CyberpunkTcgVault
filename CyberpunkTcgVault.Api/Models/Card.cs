namespace CyberpunkTcgVault.Api.Models
{
    public class Card
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

        // Source-backed Eddie/sell value. Nullable until approved catalogue data supplies it.
        public int? Eddies { get; set; }

        public bool IsLegend { get; set; }

        public string? Notes { get; set; }

        public ICollection<CardPrinting> CardPrintings { get; set; } = [];
    }
}
