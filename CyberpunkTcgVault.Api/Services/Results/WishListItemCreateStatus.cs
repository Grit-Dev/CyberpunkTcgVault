using CyberpunkTcgVault.Api.DTOs;

namespace CyberpunkTcgVault.Api.Services.Results
{
    public enum WishListItemCreateStatus
    {
        Created,
        CardPrintingNotFound,
        Duplicate
    }

    public class WishListItemCreateResult
    {
        public WishListItemCreateStatus Status { get; init; }

        public WishListItemResponse? Item { get; init; }
    }

}
