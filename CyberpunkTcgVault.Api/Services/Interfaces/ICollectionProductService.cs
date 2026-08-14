using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Services.Results;

namespace CyberpunkTcgVault.Api.Services.Interfaces
{
    public interface ICollectionProductService
    {
        Task<IReadOnlyList<CollectionProductResponse>> GetProductsAsync(
            Guid userId,
            CancellationToken cancellationToken);

        Task<CollectionProductResponse?> GetProductByIdAsync(
            Guid userId,
            int id,
            CancellationToken cancellationToken);

        Task<CollectionProductResponse> CreateProductAsync(
            Guid userId,
            CreateCollectionProductRequest request,
            CancellationToken cancellationToken);

        Task<CollectionProductUpdateResult> UpdateProductAsync(
            Guid userId,
            int id,
            UpdateCollectionProductRequest request,
            CancellationToken cancellationToken);

        Task<bool> DeleteProductAsync(
            Guid userId,
            int id,
            CancellationToken cancellationToken);
    }
}
