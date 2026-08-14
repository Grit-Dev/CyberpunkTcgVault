using System.ComponentModel.DataAnnotations;

namespace CyberpunkTcgVault.Api.DTOs
{
    public class CreateOwnedCardRequest
    {
        public int CardPrintingId { get; set; }

        [Range(0, int.MaxValue)]
        public int QuantityOwned { get; set; }

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
