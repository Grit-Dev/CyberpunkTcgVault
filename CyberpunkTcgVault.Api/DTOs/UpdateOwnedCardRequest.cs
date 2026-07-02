using System.ComponentModel.DataAnnotations;

namespace CyberpunkTcgVault.Api.DTOs
{
    // PMG TODO: No inheritance right now. This may change
    public class UpdateOwnedCardRequest
    {
        // Foreign Key
        [Range(1, int.MaxValue)]
        public int CardId { get; set; }

        [Range(0, 999)]
        public int QuantityOwned { get; set; }

        [StringLength(50)]
        public string? Condition { get; set; }

        public bool IsInMasterCollection { get; set; }

        public bool IsDuplicate { get; set; }

        public bool IsGradingCandidate { get; set; }

        public bool IsOpenForTrade { get; set; }

        public bool IsOpenToMessages { get; set; }

        public bool MaySellLater { get; set; }

        [StringLength(2000)]
        public string? Notes { get; set; }
    }
}
