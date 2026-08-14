using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CyberpunkTcgVault.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class WishListItemController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<WishListItemController> _logger;

        public WishListItemController(
            AppDbContext context,
            ILogger<WishListItemController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // Find the authenticated user's ID claim and convert it back into a Guid.
        private Guid GetLoggedInUserId()
        {
            var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!Guid.TryParse(userIdValue, out var userId))
            {
                throw new InvalidOperationException(
                    "User ID claim was not found or was invalid.");
            }

            return userId;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WishListItemResponse>>> GetWishListItems(
            CancellationToken cancellationToken)
        {
            var userId = GetLoggedInUserId();

            _logger.LogInformation(
                "Received request to get wishlist items for user {UserId}.",
                userId);

            var wishListItems = await _context.WishList
                .AsNoTracking()
                .Where(wishListItem => wishListItem.UserId == userId)
                .OrderBy(wishListItem => wishListItem.CardPrinting.Card.Name)
                .Select(wishListItem => new WishListItemResponse
                {
                    Id = wishListItem.Id,
                    CardPrintingId = wishListItem.CardPrintingId,
                    CardId = wishListItem.CardPrinting.CardId,
                    CardName = wishListItem.CardPrinting.Card.Name,
                    SetName = wishListItem.CardPrinting.CardSet.Name,
                    CardNumber = wishListItem.CardPrinting.CardNumber,
                    Rarity = wishListItem.CardPrinting.Rarity,
                    Colour = wishListItem.CardPrinting.Card.Colour,
                    WantedQuantity = wishListItem.WantedQuantity,
                    Priority = wishListItem.Priority,
                    ReasonWanted = wishListItem.ReasonWanted,
                    WantRaw = wishListItem.WantRaw,
                    WantGraded = wishListItem.WantGraded,
                    PreferredGradingCompany = wishListItem.PreferredGradingCompany,
                    IsOpenToTrade = wishListItem.IsOpenToTrade,
                    Notes = wishListItem.Notes
                })
                .ToListAsync(cancellationToken);

            _logger.LogInformation(
                "Retrieved {Count} wishlist items for user {UserId}.",
                wishListItems.Count,
                userId);

            return Ok(wishListItems);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WishListItemResponse>> GetWishListItemById(
            int id,
            CancellationToken cancellationToken)
        {
            var userId = GetLoggedInUserId();

            var wishListItem = await _context.WishList
                .AsNoTracking()
                .Where(wishListItem =>
                    wishListItem.Id == id &&
                    wishListItem.UserId == userId)
                .Select(wishListItem => new WishListItemResponse
                {
                    Id = wishListItem.Id,
                    CardPrintingId = wishListItem.CardPrintingId,
                    CardId = wishListItem.CardPrinting.CardId,
                    CardName = wishListItem.CardPrinting.Card.Name,
                    SetName = wishListItem.CardPrinting.CardSet.Name,
                    CardNumber = wishListItem.CardPrinting.CardNumber,
                    Rarity = wishListItem.CardPrinting.Rarity,
                    Colour = wishListItem.CardPrinting.Card.Colour,
                    WantedQuantity = wishListItem.WantedQuantity,
                    Priority = wishListItem.Priority,
                    ReasonWanted = wishListItem.ReasonWanted,
                    WantRaw = wishListItem.WantRaw,
                    WantGraded = wishListItem.WantGraded,
                    PreferredGradingCompany = wishListItem.PreferredGradingCompany,
                    IsOpenToTrade = wishListItem.IsOpenToTrade,
                    Notes = wishListItem.Notes
                })
                .FirstOrDefaultAsync(cancellationToken);

            if (wishListItem == null)
            {
                _logger.LogWarning(
                    "Wishlist item with ID {Id} was not found for user {UserId}.",
                    id,
                    userId);

                return NotFound();
            }

            return Ok(wishListItem);
        }

        [HttpPost]
        public async Task<ActionResult<WishListItemResponse>> CreateWishListItem(
            CreateWishListItemRequest request,
            CancellationToken cancellationToken)
        {
            var userId = GetLoggedInUserId();

            var cardPrinting = await _context.CardPrintings
                .AsNoTracking()
                .Include(cardPrinting => cardPrinting.Card)
                .Include(cardPrinting => cardPrinting.CardSet)
                .FirstOrDefaultAsync(
                    cardPrinting => cardPrinting.Id == request.CardPrintingId,
                    cancellationToken);

            if (cardPrinting == null)
            {
                return BadRequest("Card printing does not exist");
            }

            var wishListItem = new WishListItem
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
                wishListItem,
                cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);

            var response = new WishListItemResponse
            {
                Id = wishListItem.Id,
                CardPrintingId = wishListItem.CardPrintingId,
                CardId = cardPrinting.CardId,
                CardName = cardPrinting.Card.Name,
                SetName = cardPrinting.CardSet.Name,
                CardNumber = cardPrinting.CardNumber,
                Rarity = cardPrinting.Rarity,
                Colour = cardPrinting.Card.Colour,
                WantedQuantity = wishListItem.WantedQuantity,
                Priority = wishListItem.Priority,
                ReasonWanted = wishListItem.ReasonWanted,
                WantRaw = wishListItem.WantRaw,
                WantGraded = wishListItem.WantGraded,
                PreferredGradingCompany =
                    wishListItem.PreferredGradingCompany,
                IsOpenToTrade = wishListItem.IsOpenToTrade,
                Notes = wishListItem.Notes
            };

            return CreatedAtAction(
                nameof(GetWishListItemById),
                new { id = wishListItem.Id },
                response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWishListItem(
            int id,
            UpdateWishListItemRequest request,
            CancellationToken cancellationToken)
        {
            var userId = GetLoggedInUserId();

            var wishListItem = await _context.WishList
                .FirstOrDefaultAsync(
                    wishListItem =>
                        wishListItem.Id == id &&
                        wishListItem.UserId == userId,
                    cancellationToken);

            if (wishListItem == null)
            {
                return NotFound();
            }

            wishListItem.WantedQuantity = request.WantedQuantity;
            wishListItem.Priority = request.Priority?.Trim();
            wishListItem.ReasonWanted = request.ReasonWanted?.Trim();
            wishListItem.WantRaw = request.WantRaw;
            wishListItem.WantGraded = request.WantGraded;
            wishListItem.PreferredGradingCompany =
                request.PreferredGradingCompany?.Trim();
            wishListItem.IsOpenToTrade = request.IsOpenToTrade;
            wishListItem.Notes = request.Notes?.Trim();

            await _context.SaveChangesAsync(cancellationToken);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWishListItem(
            int id,
            CancellationToken cancellationToken)
        {
            var userId = GetLoggedInUserId();

            _logger.LogInformation(
                "Received request to delete wishlist item with ID {WishListItemId} for user {UserId}.",
                id,
                userId);

            var wishListItem = await _context.WishList
                .FirstOrDefaultAsync(
                    wishListItem =>
                        wishListItem.Id == id &&
                        wishListItem.UserId == userId,
                    cancellationToken);

            if (wishListItem == null)
            {
                _logger.LogWarning(
                    "Wishlist item with ID {WishListItemId} was not found for user {UserId}.",
                    id,
                    userId);

                return NotFound();
            }

            _context.WishList.Remove(wishListItem);

            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation(
                "Deleted wishlist item with ID {WishListItemId} for user {UserId}.",
                id,
                userId);

            return NoContent();
        }
    }
}
