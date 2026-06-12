using System.ComponentModel.DataAnnotations;

namespace CyberpunkTcgVault.Api.DTOs
{
    public class UpdateWishListItem
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int CardId { get; set; }

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
