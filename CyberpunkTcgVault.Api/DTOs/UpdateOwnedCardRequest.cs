using System.ComponentModel.DataAnnotations;

namespace CyberpunkTcgVault.Api.DTOs
{
    public class UpdateOwnedCardRequest
    {
        [Range(1, 999)]
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
