using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

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

        // GET is used when the client wants to retrieve/read data.
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Card>>> GetCards()
        {
            _logger.LogInformation("Received request to get all cards.");

            var cards = await _context.Cards
                .OrderBy(card => card.Name)
                .ToListAsync();

            _logger.LogInformation("Retrieved {Count} cards from the database.", cards.Count);

            return Ok(cards);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Card>> GetCardById(int id)
        {
            _logger.LogInformation("Received request to get card with ID {Id}.", id);
            // PMG TODO: Dummy data for testing the API before we have a database set up.
            var card = await _context.Cards
                .FirstOrDefaultAsync(card => card.Id == id);

            if (card == null)
            {
                _logger.LogWarning("Card with ID {Id} not found.", id);

                return NotFound();
            }

            _logger.LogInformation("Card with ID {Id} retrieved successfully.", id);

            return Ok(card);
        }

        // PMG TODO: Space from bottom bracket.

        // ADD / Create 

        [HttpPost]
        public async Task<ActionResult<Card>> CreateCard(CreateCardRequest request)
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

            if (string.IsNullOrWhiteSpace(card.Name))
            {
                _logger.LogWarning("Card creation failed: Card name is required.");

                return BadRequest("Card name is required.");
            }

            _context.Cards.Add(card);

            await _context.SaveChangesAsync();

            _logger.LogInformation("Card with ID {Id} created successfully.", card.Id);

            return CreatedAtAction(nameof(GetCardById), new { id = card.Id }, card);

        }

        [HttpPut]
        public async Task<ActionResult<Card>> UpdateCard(int id, UpdateCardRequest request)
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

            return Ok(card);
        }
    }
}