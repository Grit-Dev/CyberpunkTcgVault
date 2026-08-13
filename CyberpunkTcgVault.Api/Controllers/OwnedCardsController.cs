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
    public class OwnedCardsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<OwnedCardsController> _logger;

        public OwnedCardsController(AppDbContext context, ILogger<OwnedCardsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // Look inside the JWT. Find the logged-in user's ID. Convert it back into a Guid. Return it
        private Guid GetLoggedInUserId()
        {
            var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!Guid.TryParse(userIdValue, out var userId))
            {
                throw new InvalidOperationException("User ID claim was not found or was invalid.");
            }

            return userId;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OwnedCardResponse>>> GetOwnedCards(CancellationToken cancellationToken)
        {
            var userId = GetLoggedInUserId();

            _logger.LogInformation("Received request to get owned cards for user {UserId}.", userId);

            var ownedCards = await _context.OwnedCards
                .AsNoTracking()
                .Where(ownedCard => ownedCard.UserId == userId)
                .Include(ownedCard => ownedCard.Card)
                .OrderBy(ownedCard => ownedCard.Card.Name)
                .Select(ownedCard => new OwnedCardResponse
                {
                    Id = ownedCard.Id,
                    CardId = ownedCard.CardId,
                    CardName = ownedCard.Card.Name,
                    SetName = ownedCard.Card.SetName,
                    Rarity = ownedCard.Card.Rarity,
                    Colour = ownedCard.Card.Colour,
                    QuantityOwned = ownedCard.QuantityOwned,
                    Condition = ownedCard.Condition,
                    IsInMasterCollection = ownedCard.IsInMasterCollection,
                    IsDuplicate = ownedCard.IsDuplicate,
                    IsGradingCandidate = ownedCard.IsGradingCandidate,
                    IsOpenForTrade = ownedCard.IsOpenForTrade,
                    IsOpenToMessages = ownedCard.IsOpenToMessages,
                    MaySellLater = ownedCard.MaySellLater,
                    Notes = ownedCard.Notes
                })
                .ToListAsync(cancellationToken);

            _logger.LogInformation("Retrieved {Count} owned cards for user {UserId}.", ownedCards.Count, userId);

            return Ok(ownedCards);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OwnedCardResponse>> GetOwnedCardById(int id, CancellationToken cancellationToken)
        {
            var userId = GetLoggedInUserId();

            var ownedCard = await _context.OwnedCards
                .AsNoTracking()
                .Where(ownedCard =>
                    ownedCard.Id == id &&
                    ownedCard.UserId == userId)
                .Select(ownedCard => new OwnedCardResponse
                {
                    Id = ownedCard.Id,
                    CardId = ownedCard.CardId,
                    CardName = ownedCard.Card.Name,
                    SetName = ownedCard.Card.SetName,
                    Rarity = ownedCard.Card.Rarity,
                    Colour = ownedCard.Card.Colour,
                    QuantityOwned = ownedCard.QuantityOwned,
                    Condition = ownedCard.Condition,
                    IsInMasterCollection = ownedCard.IsInMasterCollection,
                    IsDuplicate = ownedCard.IsDuplicate,
                    IsGradingCandidate = ownedCard.IsGradingCandidate,
                    IsOpenForTrade = ownedCard.IsOpenForTrade,
                    IsOpenToMessages = ownedCard.IsOpenToMessages,
                    MaySellLater = ownedCard.MaySellLater,
                    Notes = ownedCard.Notes
                })
                .FirstOrDefaultAsync(cancellationToken);

            if (ownedCard == null)
            {
                _logger.LogWarning("Owned card with ID {Id} was not found for user {UserId}.", id, userId);

                return NotFound();
            }

            return Ok(ownedCard);
        }

        [HttpPost]
        public async Task<ActionResult<OwnedCardResponse>> CreateOwnedCard(CreateOwnedCardRequest request, CancellationToken cancellationToken)
        {
            var userId = GetLoggedInUserId();

            var card = await _context.Cards
                .AsNoTracking()
                .FirstOrDefaultAsync(card => card.Id == request.CardId, cancellationToken);

            if (card == null)
            {
                return BadRequest("Card does not exist");
            }

            var ownedCard = new OwnedCard
            {
                UserId = userId,
                CardId = request.CardId,
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

            await _context.OwnedCards.AddAsync(ownedCard, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            var response = new OwnedCardResponse
            {
                Id = ownedCard.Id,
                CardId = ownedCard.CardId,
                CardName = card.Name,
                SetName = card.SetName,
                Rarity = card.Rarity,
                Colour = card.Colour,
                QuantityOwned = ownedCard.QuantityOwned,
                Condition = ownedCard.Condition,
                IsInMasterCollection = ownedCard.IsInMasterCollection,
                IsDuplicate = ownedCard.IsDuplicate,
                IsGradingCandidate = ownedCard.IsGradingCandidate,
                IsOpenForTrade = ownedCard.IsOpenForTrade,
                IsOpenToMessages = ownedCard.IsOpenToMessages,
                MaySellLater = ownedCard.MaySellLater,
                Notes = ownedCard.Notes
            };

            return CreatedAtAction(nameof(GetOwnedCardById), new { id = ownedCard.Id }, response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOwnedCard(int id, UpdateOwnedCardRequest request, CancellationToken cancellationToken)
        {
            var userId = GetLoggedInUserId();

            var ownedCard = await _context.OwnedCards
                .FirstOrDefaultAsync(ownedCard =>
                    ownedCard.Id == id &&
                    ownedCard.UserId == userId, cancellationToken);

            if (ownedCard == null)
            {
                return NotFound();
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

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOwnedCard(int id, CancellationToken cancellationToken)
        {
            var userId = GetLoggedInUserId();

            _logger.LogInformation(
                "Received request to delete owned card with ID {OwnedCardId} for user {UserId}.",
                id,
                userId);

            var ownedCard = await _context.OwnedCards
                .FirstOrDefaultAsync(ownedCard =>
                    ownedCard.Id == id &&
                    ownedCard.UserId == userId, cancellationToken);

            if (ownedCard == null)
            {
                _logger.LogWarning(
                    "Owned card with ID {OwnedCardId} was not found for user {UserId}.",
                    id,
                    userId);

                return NotFound();
            }

            _context.OwnedCards.Remove(ownedCard);

            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation(
                "Deleted owned card with ID {OwnedCardId} for user {UserId}.",
                id,
                userId);

            return NoContent();
        }
    }
}
