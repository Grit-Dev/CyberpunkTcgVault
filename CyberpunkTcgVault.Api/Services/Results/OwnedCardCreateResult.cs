using CyberpunkTcgVault.Api.DTOs;

namespace CyberpunkTcgVault.Api.Services.Results
{
    public enum OwnedCardCreateStatus
    {
        Created,
        CardPrintingNotFound,
        Duplicate
    }

    public class OwnedCardCreateResult
    {
        public OwnedCardCreateStatus Status { get; init; }

        public OwnedCardResponse? Item { get; init; }
    }
}
