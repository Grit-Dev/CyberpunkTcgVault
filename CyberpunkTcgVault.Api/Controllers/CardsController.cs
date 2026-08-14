using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Services.Interfaces;
using CyberpunkTcgVault.Api.Services.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CyberpunkTcgVault.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CardsController : ControllerBase
    {
        private readonly ICardService _cardService;

        public CardsController(ICardService cardService)
        {
            _cardService = cardService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CardResponse>>> GetCards(
            string? name,
            string? rarity,
            string? classification,
            string? cardType,
            CancellationToken cancellationToken)
        {
            var cards = await _cardService.GetCardsAsync(
                name,
                rarity,
                classification,
                cardType,
                cancellationToken);

            return Ok(cards);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CardResponse>> GetCardById(
            int id,
            CancellationToken cancellationToken)
        {
            var card = await _cardService.GetCardByIdAsync(
                id,
                cancellationToken);

            if (card is null)
            {
                return NotFound();
            }

            return Ok(card);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<CardResponse>> CreateCard(
            CreateCardRequest request,
            CancellationToken cancellationToken)
        {
            var hasSetName =
                !string.IsNullOrWhiteSpace(request.SetName);

            var hasCardNumber =
                !string.IsNullOrWhiteSpace(request.CardNumber);

            if (hasSetName != hasCardNumber)
            {
                return BadRequest(new
                {
                    message =
                        "SetName and CardNumber must be supplied together when creating a printing."
                });
            }

            var response = await _cardService.CreateCardAsync(
                request,
                cancellationToken);

            return CreatedAtAction(
                nameof(GetCardById),
                new { id = response.Id },
                response);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCard(
            int id,
            UpdateCardRequest request,
            CancellationToken cancellationToken)
        {
            var result = await _cardService.UpdateCardAsync(
                id,
                request,
                cancellationToken);

            return result switch
            {
                CardUpdateResult.Success => NoContent(),
                CardUpdateResult.NotFound => NotFound(),
                CardUpdateResult.PrintingNotFound => BadRequest(new
                {
                    message =
                        "The requested card printing does not belong to this card."
                }),
                CardUpdateResult.InvalidPrintingData => BadRequest(new
                {
                    message =
                        "SetName and CardNumber must be supplied together when creating a printing."
                }),
                _ => StatusCode(StatusCodes.Status500InternalServerError)
            };
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCard(
            int id,
            CancellationToken cancellationToken)
        {
            var result = await _cardService.DeleteCardAsync(
                id,
                cancellationToken);

            return result switch
            {
                CardDeleteResult.Success => NoContent(),
                CardDeleteResult.NotFound => NotFound(),
                CardDeleteResult.ReferencedByCollectorData => Conflict(new
                {
                    message =
                        "This card cannot be deleted while one of its printings is referenced by collection or wishlist data."
                }),
                _ => StatusCode(StatusCodes.Status500InternalServerError)
            };
        }
    }
}
