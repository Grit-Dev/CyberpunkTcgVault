using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Services.Results;

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

        Task<OwnedCardCreateResult> CreateOwnedCardAsync(
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
