using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CyberpunkTcgVault.Api.Controllers
{
    // Marks this class as a Web API controller.
    // This gives us API-specific behaviour such as automatic request validation
    // and cleaner HTTP responses.
    [ApiController]

    // Defines the base route for this controller.
    // This means requests to /api/cards will be handled by this controller.
    // Example: GET https://localhost:xxxx/api/cards
    [Route("api/[controller]")]
    public class CardsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<CardsController> _logger;

        public CardsController(AppDbContext context, ILogger<CardsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CardResponse>>> GetCards(string? name, string? rarity, string? classification, string? cardType)
        {
            _logger.LogInformation("Received request to get cards.");

            // IQueryable allows us to add filters before the query is executed.
            // EF Core will translate the final query into SQL so filtering happens in the database.
            var query = _context.Cards.AsNoTracking();


            // Search by card name using partial matching.
            // Contains allows users to search without knowing the full card name.
            // Example: searching "Kai" will return "Kai Blackwire Sato".
            if (!string.IsNullOrWhiteSpace(name))
            {
                query = query.Where(card => card.Name.Contains(name));
            }

            // Apply rarity filtering if a value was provided.
            if (!string.IsNullOrWhiteSpace(rarity))
            {
                query = query.Where(card => card.Rarity == rarity);
            }

            // Apply classification filtering if a value was provided.
            if (!string.IsNullOrWhiteSpace(classification))
            {
                query = query.Where(card => card.Classification == classification);
            }

            // Apply cardType filtering if a value was provided.
            if (!string.IsNullOrWhiteSpace(cardType))
            {
                query = query.Where(card => card.CardType == cardType);
            }

            // Execute the query and map database entities into DTOs.
            var cards = await query
                .AsNoTracking()
                .OrderBy(card => card.Name)
                .Select(card => new CardResponse
                {
                    Id = card.Id,
                    Name = card.Name,
                    SetName = card.SetName,
                    Rarity = card.Rarity,
                    Colour = card.Colour,
                    CardType = card.CardType,
                    Classification = card.Classification,
                    Keywords = card.Keywords,
                    Cost = card.Cost,
                    Power = card.Power,
                    RamCost = card.RamCost,
                    IsLegend = card.IsLegend,
                    HasBetaSymbol = card.HasBetaSymbol,
                    IsKickstarterVersion = card.IsKickstarterVersion,
                    IsRetailVersion = card.IsRetailVersion,
                    IsFoil = card.IsFoil,
                    IsAltArt = card.IsAltArt,
                    IsBoxTopper = card.IsBoxTopper,
                    IsPromo = card.IsPromo,
                    IsStarterDeckExclusive = card.IsStarterDeckExclusive,
                    CardNumber = card.CardNumber,
                    ImageUrl = card.ImageUrl,
                    Notes = card.Notes

                })
                .ToListAsync();

            _logger.LogInformation("Retrieved {Count} cards from the database", cards.Count);

            return Ok(cards);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CardResponse>> GetCardById(int id)
        {
            _logger.LogInformation("Received request to get card with ID {Id}.", id);

            var card = await _context.Cards
                .AsNoTracking()
                .Where(card => card.Id == id)
                .Select(card => new CardResponse
                {
                    Id = card.Id,
                    Name = card.Name,
                    SetName = card.SetName,
                    Rarity = card.Rarity,
                    Colour = card.Colour,
                    CardType = card.CardType,
                    Classification = card.Classification
                })
                .FirstOrDefaultAsync();

            if (card == null)
            {
                _logger.LogWarning("Card with ID {Id} not found.", id);

                return NotFound();
            }

            _logger.LogInformation("Card with ID {Id} retrieved successfully.", id);

            return Ok(card);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<CardResponse>> CreateCard(CreateCardRequest request)
        {

            _logger.LogInformation("Received request to create a new card with name {Name}.", request.Name);

            var card = new Card
            {
                Name = request.Name.Trim(),
                SetName = request.SetName?.Trim(),
                Rarity = request.Rarity?.Trim(),
                Colour = request.Colour?.Trim(),
                CardType = request.CardType?.Trim(),
                Classification = request.Classification?.Trim(),
                Keywords = request.Keywords?.Trim(),
                Cost = request.Cost,
                Power = request.Power,
                RamCost = request.RamCost,
                IsLegend = request.IsLegend,
                HasBetaSymbol = request.HasBetaSymbol,
                IsKickstarterVersion = request.IsKickstarterVersion,
                IsRetailVersion = request.IsRetailVersion,
                IsFoil = request.IsFoil,
                IsAltArt = request.IsAltArt,
                IsBoxTopper = request.IsBoxTopper,
                IsPromo = request.IsPromo,
                IsStarterDeckExclusive = request.IsStarterDeckExclusive,
                CardNumber = request.CardNumber?.Trim(),
                ImageUrl = request.ImageUrl?.Trim(),
                Notes = request.Notes?.Trim()
            };

            _context.Cards.Add(card);

            await _context.SaveChangesAsync();

            var cardResponse = new CardResponse
            {
                Id = card.Id,
                Name = card.Name,
                SetName = card.SetName,
                Rarity = card.Rarity,
                Colour = card.Colour,
                CardType = card.CardType,
                Classification = card.Classification,
                Keywords = card.Keywords,
                Cost = card.Cost,
                Power = card.Power,
                RamCost = card.RamCost,
                IsLegend = card.IsLegend,
                HasBetaSymbol = card.HasBetaSymbol,
                IsKickstarterVersion = card.IsKickstarterVersion,
                IsRetailVersion = card.IsRetailVersion,
                IsFoil = card.IsFoil,
                IsAltArt = card.IsAltArt,
                IsBoxTopper = card.IsBoxTopper,
                IsPromo = card.IsPromo,
                IsStarterDeckExclusive = card.IsStarterDeckExclusive,
                CardNumber = card.CardNumber,
                ImageUrl = card.ImageUrl,
                Notes = card.Notes
            };


            _logger.LogInformation("Card with ID {Id} created successfully.", card.Id);

            return CreatedAtAction(nameof(GetCardById), new { id = cardResponse.Id }, cardResponse);

        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCard(int id, UpdateCardRequest request)
        {
            _logger.LogInformation("Received request to update card with ID {Id}.", id);

            var card = await _context.Cards
                .FirstOrDefaultAsync(card => card.Id == id);

            if (card == null)
            {
                _logger.LogWarning("Card with ID {Id} not found for update.", id);

                return NotFound();
            }

            card.Name = request.Name.Trim();
            card.SetName = request.SetName?.Trim();
            card.Rarity = request.Rarity?.Trim();
            card.Colour = request.Colour?.Trim();
            card.CardType = request.CardType?.Trim();
            card.Classification = request.Classification?.Trim();
            card.Keywords = request.Keywords?.Trim();
            card.Cost = request.Cost;
            card.Power = request.Power;
            card.RamCost = request.RamCost;
            card.IsLegend = request.IsLegend;
            card.HasBetaSymbol = request.HasBetaSymbol;
            card.IsKickstarterVersion = request.IsKickstarterVersion;
            card.IsRetailVersion = request.IsRetailVersion;
            card.IsFoil = request.IsFoil;
            card.IsAltArt = request.IsAltArt;
            card.IsBoxTopper = request.IsBoxTopper;
            card.IsPromo = request.IsPromo;
            card.IsStarterDeckExclusive = request.IsStarterDeckExclusive;
            card.CardNumber = request.CardNumber?.Trim();
            card.ImageUrl = request.ImageUrl?.Trim();
            card.Notes = request.Notes?.Trim();

            await _context.SaveChangesAsync();

            _logger.LogInformation("Card with ID {Id} updated successfully.", id);

            // PMG TODO: Return NoContent() - However I want to see the response 

            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCard(int id)
        {
            _logger.LogInformation("Recieved request to delete card with ID {CardId}", id);

            var card = await _context.Cards.FirstOrDefaultAsync(card => card.Id == id);

            if (card == null)
            {
                _logger.LogWarning("Owned card with ID {OwnedCardId} was not found.", id);

                return NotFound();
            }

            _context.Cards.Remove(card);

            await _context.SaveChangesAsync();


            return NoContent();
        }
    }
}