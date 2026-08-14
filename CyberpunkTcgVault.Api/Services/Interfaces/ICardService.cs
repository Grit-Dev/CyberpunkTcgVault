using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Services.Results;

namespace CyberpunkTcgVault.Api.Services.Interfaces
{
    public interface ICardService
    {
        Task<IReadOnlyList<CardResponse>> GetCardsAsync(
            string? name,
            string? rarity,
            string? classification,
            string? cardType,
            CancellationToken cancellationToken);

        Task<CardResponse?> GetCardByIdAsync(
            int id,
            CancellationToken cancellationToken);

        Task<CardResponse> CreateCardAsync(
            CreateCardRequest request,
            CancellationToken cancellationToken);

        Task<CardUpdateResult> UpdateCardAsync(
            int id,
            UpdateCardRequest request,
            CancellationToken cancellationToken);

        Task<CardDeleteResult> DeleteCardAsync(
            int id,
            CancellationToken cancellationToken);
    }
}
