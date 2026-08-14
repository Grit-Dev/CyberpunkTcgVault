using CyberpunkTcgVault.Api.DTOs;

namespace CyberpunkTcgVault.Api.Services.Interfaces
{
    public interface IWishListItemService
    {
        Task<IReadOnlyList<WishListItemResponse>> GetWishListItemsAsync(
            Guid userId,
            CancellationToken cancellationToken);

        Task<WishListItemResponse?> GetWishListItemByIdAsync(
            Guid userId,
            int id,
            CancellationToken cancellationToken);

        Task<WishListItemResponse?> CreateWishListItemAsync(
            Guid userId,
            CreateWishListItemRequest request,
            CancellationToken cancellationToken);

        Task<bool> UpdateWishListItemAsync(
            Guid userId,
            int id,
            UpdateWishListItemRequest request,
            CancellationToken cancellationToken);

        Task<bool> DeleteWishListItemAsync(
            Guid userId,
            int id,
            CancellationToken cancellationToken);
    }
}
