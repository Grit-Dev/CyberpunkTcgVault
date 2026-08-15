using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Services.Results;

namespace CyberpunkTcgVault.Api.Services.Interfaces
{
    public interface ICardService
    {
        Task<IReadOnlyList<CardResponse>> GetCardsAsync(
            CardCatalogueQuery query,
            CancellationToken cancellationToken);

        Task<PagedResponse<CardResponse>> GetCardsPageAsync(
            CardCatalogueQuery query,
            int page,
            int pageSize,
            CancellationToken cancellationToken);

        Task<CardFilterOptionsResponse> GetFilterOptionsAsync(
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
