using CyberpunkTcgVault.Api.Models;
using Microsoft.AspNetCore.Mvc;

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
        // GET is used when the client wants to retrieve/read data.
        [HttpGet]
        public ActionResult<IEnumerable<Card>> GetCards()
        {
            // PMG TODO: Dummy data for testing the API before we have a database set up.
            var cards = GetSampleCards();

            return Ok(cards);
        }

        [HttpGet("{id}")]
        public ActionResult<Card> GetCardById(int id)
        {
            // PMG TODO: Dummy data for testing the API before we have a database set up.
            var cards = GetSampleCards();

            var card = GetSampleCards().FirstOrDefault(card => card.Id == id);

            if (card == null)
            {
                return NotFound();
            }

            return Ok(card);
        }

        private static List<Card> GetSampleCards()
        {
            var cards = new List<Card>
            {
                new Card
                {
                    Id = 1,
                    Name = "Example Legend",
                    SetName = "Beta",
                    Rarity = "Legend",
                    Colour = "Red",
                    CardType = "Legend",
                    IsLegend = true,
                    HasBetaSymbol = true,
                    QuantityOwned = 1,
                    Condition = "Near Mint",
                    Notes = "Placeholder card for testing the API."
                },
                new Card
                {
                    Id = 2,
                    Name = "Example Unit",
                    SetName = "Retail",
                    Rarity = "Rare",
                    Colour = "Blue",
                    CardType = "Unit",
                    Cost = 3,
                    Power = 4,
                    RamCost = 2,
                    QuantityOwned = 3,
                    Condition = "Near Mint",
                    Notes = "Testing normal non-Legend card data."
                },
                new Card
                {
                    Id = 3,
                    Name = "Example Promo",
                    SetName = "Pre-release",
                    Rarity = "Promo",
                    Colour = "Yellow",
                    CardType = "Program",
                    IsPromo = true,
                    QuantityOwned = 0,
                    Notes = "Wishlist-style placeholder card."
                }
            };

            return (cards);
        }
    }
}