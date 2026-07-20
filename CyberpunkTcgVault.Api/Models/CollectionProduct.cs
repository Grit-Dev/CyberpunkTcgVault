namespace CyberpunkTcgVault.Api.Models
{
    public class CollectionProduct
    {
        public int Id { get; set; }

        // Foreign Key: Collection Product
        public Guid UserId { get; set; }

        // Navigation back to the owning user.
        public AppUser User { get; set; } = null!;

        public string ProductName { get; set; } = string.Empty;

        public string? ProductType { get; set; }

        public string? Edition { get; set; }

        public int Quantity { get; set; }

        public bool IsSealed { get; set; }

        public bool IsBetaProduct { get; set; }

        public bool IsKickstarterProduct { get; set; }

        public bool IsRetailProduct { get; set; }

        public bool IsPledgeItem { get; set; }

        public decimal? PurchaseCost { get; set; }

        public decimal? ShippingCost { get; set; }

        public decimal? VatCost { get; set; }

        public decimal? EstimatedValue { get; set; }

        public decimal? MinimumSellPrice { get; set; }

        // PMG TODO: Internal use later on
        public string? StorageLocation { get; set; }

        public bool IsLongTermHold { get; set; }

        public bool IsOpenToTrade { get; set; }

        public bool MaySellLater { get; set; }

        public string? ImageUrl { get; set; }

        public string? Notes { get; set; }
    }
}
