using System.ComponentModel.DataAnnotations;

namespace CyberpunkTcgVault.Api.DTOs
{
    public class UpdateCollectionProductRequestcs
    {
        [Required]
        [StringLength(200)]
        public string ProductName { get; set; } = string.Empty;

        [StringLength(100)]
        public string? ProductType { get; set; }

        [StringLength(100)]
        public string? Edition { get; set; }

        [Range(0, 9999)]
        public int Quantity { get; set; }

        public bool IsSealed { get; set; }

        public bool IsBetaProduct { get; set; }

        public bool IsKickstarterProduct { get; set; }

        public bool IsRetailProduct { get; set; }

        public bool IsPledgeItem { get; set; }

        //PMG TODO: This may need to be changed later own
        [Range(typeof(decimal), "0", "999999.99")]
        public decimal? PurchaseCost { get; set; }

        [Range(typeof(decimal), "0", "999999.99")]
        public decimal? ShippingCost { get; set; }

        [Range(typeof(decimal), "0", "999999.99")]
        public decimal? VatCost { get; set; }

        [Range(typeof(decimal), "0", "999999.99")]
        public decimal? EstimatedValue { get; set; }

        [Range(typeof(decimal), "0", "999999.99")]
        public decimal? MinimumSellPrice { get; set; }

        [StringLength(200)]
        public string? StorageLocation { get; set; }

        public bool IsLongTermHold { get; set; }

        public bool IsOpenToTrade { get; set; }

        public bool MaySellLater { get; set; }

        [StringLength(500)]
        public string? ImageUrl { get; set; }

        [StringLength(2000)]
        public string? Notes { get; set; }
    }
}
