using CyberpunkTcgVault.Api.DTOs;

namespace CyberpunkTcgVault.Api.Services.Interfaces
{
    public interface IOwnedCardService
    {
        Task<IReadOnlyList<OwnedCardResponse>> GetOwnedCardsAsync(
            Guid userId,
            CancellationToken cancellationToken);

        Task<OwnedCardResponse?> GetOwnedCardByIdAsync(
            Guid userId,
            int id,
            CancellationToken cancellationToken);

        Task<OwnedCardResponse?> CreateOwnedCardAsync(
            Guid userId,
            CreateOwnedCardRequest request,
            CancellationToken cancellationToken);

        Task<bool> UpdateOwnedCardAsync(
            Guid userId,
            int id,
            UpdateOwnedCardRequest request,
            CancellationToken cancellationToken);

        Task<bool> DeleteOwnedCardAsync(
            Guid userId,
            int id,
            CancellationToken cancellationToken);
    }
}
