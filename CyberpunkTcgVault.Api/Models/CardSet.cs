namespace CyberpunkTcgVault.Api.Models
{
    public class CardSet
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string? Code { get; set; }

        public ICollection<CardPrinting> CardPrintings { get; set; } = [];
    }
}
