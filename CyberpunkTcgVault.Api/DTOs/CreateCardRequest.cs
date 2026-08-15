using System.ComponentModel.DataAnnotations;

namespace CyberpunkTcgVault.Api.DTOs
{
    public class CreateCardRequest
    {
        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [StringLength(150)]
        public string? SetName { get; set; }

        [StringLength(50)]
        public string? Rarity { get; set; }

        [StringLength(50)]
        public string? Colour { get; set; }

        [StringLength(50)]
        public string? CardType { get; set; }

        [StringLength(100)]
        public string? Classification { get; set; }

        [StringLength(250)]
        public string? Keywords { get; set; }

        [Range(0, 50)]
        public int? Cost { get; set; }

        [Range(0, 50)]
        public int? Power { get; set; }

        [Range(0, 50)]
        public int? RamCost { get; set; }

        [Range(0, int.MaxValue)]
        public int? Eddies { get; set; }

        public bool IsLegend { get; set; }

        public bool HasBetaSymbol { get; set; }

        public bool IsKickstarterVersion { get; set; }

        public bool IsRetailVersion { get; set; }

        public bool IsFoil { get; set; }

        public bool IsAltArt { get; set; }

        public bool IsBoxTopper { get; set; }

        public bool IsPromo { get; set; }

        public bool IsStarterDeckExclusive { get; set; }

        [StringLength(50)]
        public string? CardNumber { get; set; }

        [StringLength(500)]
        public string? ImageUrl { get; set; }

        [StringLength(2000)]
        public string? Notes { get; set; }
    }
}