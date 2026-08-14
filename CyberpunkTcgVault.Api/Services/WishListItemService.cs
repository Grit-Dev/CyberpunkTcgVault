using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CyberpunkTcgVault.Api.Services
{
    public class WishListItemService : IWishListItemService
    {
        private readonly AppDbContext _context;
        private readonly ILogger<WishListItemService> _logger;

        public WishListItemService(
            AppDbContext context,
            ILogger<WishListItemService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IReadOnlyList<WishListItemResponse>> GetWishListItemsAsync(
            Guid userId,
            CancellationToken cancellationToken)
        {
            var items = await ProjectWishListItems(
                    _context.WishList
                        .AsNoTracking()
                        .Where(item => item.UserId == userId))
                .OrderBy(item => item.CardName)
                .ToListAsync(cancellationToken);

            _logger.LogInformation(
                "Retrieved {Count} wishlist items for user {UserId}.",
                items.Count,
                userId);

            return items;
        }

        public async Task<WishListItemResponse?> GetWishListItemByIdAsync(
            Guid userId,
            int id,
            CancellationToken cancellationToken)
        {
            return await ProjectWishListItems(
                    _context.WishList
                        .AsNoTracking()
                        .Where(item =>
                            item.Id == id &&
                            item.UserId == userId))
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<WishListItemResponse?> CreateWishListItemAsync(
            Guid userId,
            CreateWishListItemRequest request,
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

            var item = new WishListItem
            {
                UserId = userId,
                CardPrintingId = request.CardPrintingId,
                WantedQuantity = request.WantedQuantity,
                Priority = request.Priority?.Trim(),
                ReasonWanted = request.ReasonWanted?.Trim(),
                WantRaw = request.WantRaw,
                WantGraded = request.WantGraded,
                PreferredGradingCompany =
                    request.PreferredGradingCompany?.Trim(),
                IsOpenToTrade = request.IsOpenToTrade,
                Notes = request.Notes?.Trim()
            };

            await _context.WishList.AddAsync(
                item,
                cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation(
                "Created wishlist item {WishListItemId} for user {UserId}.",
                item.Id,
                userId);

            return await GetWishListItemByIdAsync(
                userId,
                item.Id,
                cancellationToken);
        }

        public async Task<bool> UpdateWishListItemAsync(
            Guid userId,
            int id,
            UpdateWishListItemRequest request,
            CancellationToken cancellationToken)
        {
            var item = await _context.WishList
                .FirstOrDefaultAsync(
                    item =>
                        item.Id == id &&
                        item.UserId == userId,
                    cancellationToken);

            if (item is null)
            {
                return false;
            }

            item.WantedQuantity = request.WantedQuantity;
            item.Priority = request.Priority?.Trim();
            item.ReasonWanted = request.ReasonWanted?.Trim();
            item.WantRaw = request.WantRaw;
            item.WantGraded = request.WantGraded;
            item.PreferredGradingCompany =
                request.PreferredGradingCompany?.Trim();
            item.IsOpenToTrade = request.IsOpenToTrade;
            item.Notes = request.Notes?.Trim();

            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }

        public async Task<bool> DeleteWishListItemAsync(
            Guid userId,
            int id,
            CancellationToken cancellationToken)
        {
            var item = await _context.WishList
                .FirstOrDefaultAsync(
                    item =>
                        item.Id == id &&
                        item.UserId == userId,
                    cancellationToken);

            if (item is null)
            {
                return false;
            }

            _context.WishList.Remove(item);
            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation(
                "Deleted wishlist item {WishListItemId} for user {UserId}.",
                id,
                userId);

            return true;
        }

        private static IQueryable<WishListItemResponse> ProjectWishListItems(
            IQueryable<WishListItem> query)
        {
            return query.Select(item => new WishListItemResponse
            {
                Id = item.Id,
                CardPrintingId = item.CardPrintingId,
                CardId = item.CardPrinting.CardId,
                CardName = item.CardPrinting.Card.Name,
                SetName = item.CardPrinting.CardSet.Name,
                CardNumber = item.CardPrinting.CardNumber,
                Rarity = item.CardPrinting.Rarity,
                Colour = item.CardPrinting.Card.Colour,
                WantedQuantity = item.WantedQuantity,
                Priority = item.Priority,
                ReasonWanted = item.ReasonWanted,
                WantRaw = item.WantRaw,
                WantGraded = item.WantGraded,
                PreferredGradingCompany =
                    item.PreferredGradingCompany,
                IsOpenToTrade = item.IsOpenToTrade,
                Notes = item.Notes
            });
        }
    }
}
