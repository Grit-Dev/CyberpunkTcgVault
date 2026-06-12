using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CyberpunkTcgVault.Api.Controllers
{
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OwnedCard>>> GetOwnedCards()
        {
            _logger.LogInformation("Received request to get all owned cards.");

            var ownedCards = await _context.OwnedCards
                .Include(ownedCards => ownedCards.Card)
                .OrderBy(ownedCard => ownedCard.Card.Name)
                .ToListAsync();

            _logger.LogInformation("Retrieved {Count} owned cards from the database.", ownedCards.Count);

            return Ok(ownedCards);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OwnedCard>> GetOwnedCardById(int id)
        {
            var ownedCard = await _context.OwnedCards
                .Include(ownedCards => ownedCards.Card)
                .FirstOrDefaultAsync(ownedCard => ownedCard.Id == id);

            if (ownedCard == null)
            {
                _logger.LogWarning("Owned card with ID {Id} not found.", id);
                return NotFound();
            }

            return Ok(ownedCard);
        }

        [HttpPost]
        public async Task<ActionResult<OwnedCard>> CreateOwnedCard(CreateOwnedCardRequest request)
        {
            var cardExists = await _context.Cards.AnyAsync(cards => cards.Id == request.CardId);

            if (!cardExists)
            {
                return BadRequest("Card does not exist");

            }

            var ownedCardq = new OwnedCard
            {
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

            await _context.OwnedCards.AddAsync(ownedCardq);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOwnedCardById), new { id = ownedCardq.Id }, ownedCardq);
            
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOwnedCard(int id, UpdateOwnedCardRequest request)
        {
            var ownedCard = await _context.OwnedCards
                .FirstOrDefaultAsync(ownedCard => ownedCard.Id == id);

            if (ownedCard == null)
            {
                return NotFound();
            }

            var cardExists = await _context.Cards
                .AnyAsync(card => card.Id == request.CardId);

            if (!cardExists)
            {
                return BadRequest("Card does not exist.");
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

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOwnedCard(int id)
        {
            _logger.LogInformation("Received request to delete owned card with ID {OwnedCardId}.", id);

            var ownedCard = await _context.OwnedCards
                .FirstOrDefaultAsync(ownedCard => ownedCard.Id == id);

            if (ownedCard == null)
            {
                _logger.LogWarning("Owned card with ID {OwnedCardId} was not found.", id);

                return NotFound();
            }

            _context.OwnedCards.Remove(ownedCard);

            await _context.SaveChangesAsync();

            _logger.LogInformation("Deleted owned card with ID {OwnedCardId}.", id);

            return NoContent();
        }
    }
}
