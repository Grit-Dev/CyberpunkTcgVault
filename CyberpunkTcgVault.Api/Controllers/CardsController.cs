using CyberpunkTcgVault.Api.Data;
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

    }
}