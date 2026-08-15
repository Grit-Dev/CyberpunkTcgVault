namespace CyberpunkTcgVault.Api.DTOs
{
    public class CardFilterOptionsResponse
    {
        public IReadOnlyList<string> Colours { get; set; } = [];

        public IReadOnlyList<string> CardTypes { get; set; } = [];

        public IReadOnlyList<string> Tags { get; set; } = [];

        public IReadOnlyList<int> Costs { get; set; } = [];

        public IReadOnlyList<int> Powers { get; set; } = [];

        public IReadOnlyList<int> RamValues { get; set; } = [];

        public IReadOnlyList<int> EddiesValues { get; set; } = [];

        public IReadOnlyList<CardSetFilterOptionResponse> Sets { get; set; } = [];

        public IReadOnlyList<string> Rarities { get; set; } = [];
    }

    public class CardSetFilterOptionResponse
    {
        public string Code { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;
    }
}
