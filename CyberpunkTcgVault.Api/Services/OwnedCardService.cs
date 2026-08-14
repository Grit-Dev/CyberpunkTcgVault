using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CyberpunkTcgVault.Api.Services
{
    public class OwnedCardService : IOwnedCardService
    {
        private readonly AppDbContext _context;
        private readonly ILogger<OwnedCardService> _logger;

        public OwnedCardService(
            AppDbContext context,
            ILogger<OwnedCardService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IReadOnlyList<OwnedCardResponse>> GetOwnedCardsAsync(
            Guid userId,
            CancellationToken cancellationToken)
        {
            var ownedCards = await ProjectOwnedCards(
                    _context.OwnedCards
                        .AsNoTracking()
                        .Where(ownedCard =>
                            ownedCard.UserId == userId))
                .OrderBy(ownedCard => ownedCard.CardName)
                .ToListAsync(cancellationToken);

            _logger.LogInformation(
                "Retrieved {Count} owned cards for user {UserId}.",
                ownedCards.Count,
                userId);

            return ownedCards;
        }

        public async Task<OwnedCardResponse?> GetOwnedCardByIdAsync(
            Guid userId,
            int id,
            CancellationToken cancellationToken)
        {
            return await ProjectOwnedCards(
                    _context.OwnedCards
                        .AsNoTracking()
                        .Where(ownedCard =>
                            ownedCard.Id == id &&
                            ownedCard.UserId == userId))
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<OwnedCardResponse?> CreateOwnedCardAsync(
            Guid userId,
            CreateOwnedCardRequest request,
            CancellationToken cancellationToken)
        {
            var cardPrintingExists = await _context.CardPrintings
                .AsNoTracking()
                .AnyAsync(
                    cardPrinting =>
                        cardPrinting.Id == request.CardPrintingId,
                    cancellationToken);

            if (!cardPrintingExists)
            {
                return null;
            }

            var ownedCard = new OwnedCard
            {
                UserId = userId,
                CardPrintingId = request.CardPrintingId,
                QuantityOwned = request.QuantityOwned,
                Condition = request.Condition?.Trim(),
                IsInMasterCollection = request.IsInMasterCollection,
                IsDuplicate = request.IsDuplicate,
                IsGradingCandidate = request.IsGradingCandidate,
                IsOpenForTrade = request.IsOpenForTrade,
                IsOpenToMessages = request.IsOpenToMessages,
                MaySellLater = request.MaySellLater,
                Notes = request.Notes?.Trim()
            };

            await _context.OwnedCards.AddAsync(
                ownedCard,
                cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation(
                "Created owned card {OwnedCardId} for user {UserId}.",
                ownedCard.Id,
                userId);

            return await GetOwnedCardByIdAsync(
                userId,
                ownedCard.Id,
                cancellationToken);
        }

        public async Task<bool> UpdateOwnedCardAsync(
            Guid userId,
            int id,
            UpdateOwnedCardRequest request,
            CancellationToken cancellationToken)
        {
            var ownedCard = await _context.OwnedCards
                .FirstOrDefaultAsync(
                    ownedCard =>
                        ownedCard.Id == id &&
                        ownedCard.UserId == userId,
                    cancellationToken);

            if (ownedCard is null)
            {
                return false;
            }

            ownedCard.QuantityOwned = request.QuantityOwned;
            ownedCard.Condition = request.Condition?.Trim();
            ownedCard.IsInMasterCollection = request.IsInMasterCollection;
            ownedCard.IsDuplicate = request.IsDuplicate;
            ownedCard.IsGradingCandidate = request.IsGradingCandidate;
            ownedCard.IsOpenForTrade = request.IsOpenForTrade;
            ownedCard.IsOpenToMessages = request.IsOpenToMessages;
            ownedCard.MaySellLater = request.MaySellLater;
            ownedCard.Notes = request.Notes?.Trim();

            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }

        public async Task<bool> DeleteOwnedCardAsync(
            Guid userId,
            int id,
            CancellationToken cancellationToken)
        {
            var ownedCard = await _context.OwnedCards
                .FirstOrDefaultAsync(
                    ownedCard =>
                        ownedCard.Id == id &&
                        ownedCard.UserId == userId,
                    cancellationToken);

            if (ownedCard is null)
            {
                return false;
            }

            _context.OwnedCards.Remove(ownedCard);
            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation(
                "Deleted owned card {OwnedCardId} for user {UserId}.",
                id,
                userId);

            return true;
        }

        private static IQueryable<OwnedCardResponse> ProjectOwnedCards(
            IQueryable<OwnedCard> query)
        {
            return query.Select(ownedCard => new OwnedCardResponse
            {
                Id = ownedCard.Id,
                CardPrintingId = ownedCard.CardPrintingId,
                CardId = ownedCard.CardPrinting.CardId,
                CardName = ownedCard.CardPrinting.Card.Name,
                SetName = ownedCard.CardPrinting.CardSet.Name,
                CardNumber = ownedCard.CardPrinting.CardNumber,
                Rarity = ownedCard.CardPrinting.Rarity,
                Colour = ownedCard.CardPrinting.Card.Colour,
                QuantityOwned = ownedCard.QuantityOwned,
                Condition = ownedCard.Condition,
                IsInMasterCollection = ownedCard.IsInMasterCollection,
                IsDuplicate = ownedCard.IsDuplicate,
                IsGradingCandidate = ownedCard.IsGradingCandidate,
                IsOpenForTrade = ownedCard.IsOpenForTrade,
                IsOpenToMessages = ownedCard.IsOpenToMessages,
                MaySellLater = ownedCard.MaySellLater,
                Notes = ownedCard.Notes
            });
        }
    }
}
