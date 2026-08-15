using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Security;
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

        [Authorize(Policy = AuthorizationPolicies.AdminWithMfa)]
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
                return Problem(
                    statusCode: StatusCodes.Status400BadRequest,
                    title: "Invalid printing data.",
                    detail: "SetName and CardNumber must be supplied together when creating a printing.");
            }

            var response = await _cardService.CreateCardAsync(
                request,
                cancellationToken);

            return CreatedAtAction(
                nameof(GetCardById),
                new { id = response.Id },
                response);
        }

        [Authorize(Policy = AuthorizationPolicies.AdminWithMfa)]
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
                CardUpdateResult.PrintingNotFound => Problem(
                    statusCode: StatusCodes.Status400BadRequest,
                    title: "Invalid card printing.",
                    detail: "The requested card printing does not belong to this card."),
                CardUpdateResult.InvalidPrintingData => Problem(
                    statusCode: StatusCodes.Status400BadRequest,
                    title: "Invalid printing data.",
                    detail: "SetName and CardNumber must be supplied together when creating a printing."),
                _ => Problem(
                    statusCode: StatusCodes.Status500InternalServerError,
                    title: "Unable to update card.")
            };
        }

        [Authorize(Policy = AuthorizationPolicies.AdminWithMfa)]
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
                CardDeleteResult.ReferencedByCollectorData => Problem(
                    statusCode: StatusCodes.Status409Conflict,
                    title: "Card is referenced by collector data.",
                    detail: "This card cannot be deleted while one of its printings is referenced by collection or wishlist data."),
                _ => Problem(
                    statusCode: StatusCodes.Status500InternalServerError,
                    title: "Unable to delete card.")
            };
        }
    }
}
