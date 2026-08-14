using System.ComponentModel.DataAnnotations;

namespace CyberpunkTcgVault.Api.DTOs
{
    public class CreateWishListItemRequest
    {
        // Foreign key to the CardPrintings table.
        public int CardPrintingId { get; set; }

        [Required]
        [Range(1, 999)]
        public int WantedQuantity { get; set; }

        [StringLength(50)]
        public string? Priority { get; set; }

        [StringLength(500)]
        public string? ReasonWanted { get; set; }

        public bool WantRaw { get; set; }

        public bool WantGraded { get; set; }

        [StringLength(50)]
        public string? PreferredGradingCompany { get; set; }

        public bool IsOpenToTrade { get; set; }

        [StringLength(2000)]
        public string? Notes { get; set; }
    }
}
