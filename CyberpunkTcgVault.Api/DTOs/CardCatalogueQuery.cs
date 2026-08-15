using Microsoft.AspNetCore.Mvc;

namespace CyberpunkTcgVault.Api.DTOs
{
    public class CardCatalogueQuery
    {
        public string? Name { get; set; }

        public string? Colour { get; set; }

        public string? CardType { get; set; }

        // Alias for the genuine source vocabulary while cardType remains the
        // canonical Choom Vault parameter used by the current frontend.
        [FromQuery(Name = "type")]
        public string? Type { get; set; }

        public string? Classification { get; set; }

        [FromQuery(Name = "tags")]
        public string? Tags { get; set; }

        // Kept as a convenience alias because earlier catalogue discussions
        // used the singular form. The frontend contract documents `tags` as
        // canonical.
        [FromQuery(Name = "tag")]
        public string? Tag { get; set; }

        public int? Cost { get; set; }

        public int? Power { get; set; }

        public int? Ram { get; set; }

        public int? Eddies { get; set; }

        public string? SetCode { get; set; }

        public string? Rarity { get; set; }

        public string? SortBy { get; set; } = CardCatalogueSortOptions.SetOrder;

        public string? SortDirection { get; set; } = CardCatalogueSortOptions.Ascending;

        public string? EffectiveCardType =>
            !string.IsNullOrWhiteSpace(CardType)
                ? CardType
                : Type;

        public string? EffectiveTag =>
            !string.IsNullOrWhiteSpace(Tags)
                ? Tags
                : Tag;
    }

    public static class CardCatalogueSortOptions
    {
        public const string SetOrder = "setOrder";
        public const string Name = "name";
        public const string Ascending = "asc";
        public const string Descending = "desc";

        public static bool IsSupportedSortBy(string? value) =>
            string.IsNullOrWhiteSpace(value)
            || value.Equals(SetOrder, StringComparison.OrdinalIgnoreCase)
            || value.Equals(Name, StringComparison.OrdinalIgnoreCase);

        public static bool IsSupportedDirection(string? value) =>
            string.IsNullOrWhiteSpace(value)
            || value.Equals(Ascending, StringComparison.OrdinalIgnoreCase)
            || value.Equals(Descending, StringComparison.OrdinalIgnoreCase);
    }
}
