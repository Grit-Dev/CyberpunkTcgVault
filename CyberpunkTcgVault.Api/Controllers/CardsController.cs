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
        private const int DefaultPageSize = 24;
        private const int MaximumPageSize = 100;

        private readonly ICardService _cardService;

        public CardsController(ICardService cardService)
        {
            _cardService = cardService;
        }

        // Legacy/current Angular catalogue contract. This remains an array so
        // the existing public catalogue is not broken while the frontend moves
        // to the paged endpoint below.
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CardResponse>>> GetCards(
            [FromQuery] CardCatalogueQuery query,
            CancellationToken cancellationToken)
        {
            var sortValidation = ValidateSort(query);

            if (sortValidation is not null)
            {
                return sortValidation;
            }

            var cards = await _cardService.GetCardsAsync(
                query,
                cancellationToken);

            return Ok(cards);
        }

        // Non-breaking server-side pagination path. Angular can migrate to this
        // endpoint deliberately instead of changing the JSON shape of GET
        // /api/Cards underneath the currently deployed catalogue.
        [AllowAnonymous]
        [HttpGet("paged")]
        public async Task<ActionResult<PagedResponse<CardResponse>>> GetCardsPaged(
            [FromQuery] CardCatalogueQuery query,
            int page = 1,
            int pageSize = DefaultPageSize,
            CancellationToken cancellationToken = default)
        {
            var sortValidation = ValidateSort(query);

            if (sortValidation is not null)
            {
                return sortValidation;
            }

            if (page < 1)
            {
                return Problem(
                    statusCode: StatusCodes.Status400BadRequest,
                    title: "Invalid page.",
                    detail: "Page must be greater than or equal to 1.");
            }

            if (pageSize < 1 || pageSize > MaximumPageSize)
            {
                return Problem(
                    statusCode: StatusCodes.Status400BadRequest,
                    title: "Invalid page size.",
                    detail: $"PageSize must be between 1 and {MaximumPageSize}.");
            }

            if ((long)(page - 1) * pageSize > int.MaxValue)
            {
                return Problem(
                    statusCode: StatusCodes.Status400BadRequest,
                    title: "Invalid page.",
                    detail: "The requested page is outside the supported catalogue range.");
            }

            var response = await _cardService.GetCardsPageAsync(
                query,
                page,
                pageSize,
                cancellationToken);

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpGet("filter-options")]
        public async Task<ActionResult<CardFilterOptionsResponse>> GetFilterOptions(
            CancellationToken cancellationToken)
        {
            var options = await _cardService.GetFilterOptionsAsync(
                cancellationToken);

            return Ok(options);
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

        private ObjectResult? ValidateSort(CardCatalogueQuery query)
        {
            if (!CardCatalogueSortOptions.IsSupportedSortBy(query.SortBy))
            {
                return Problem(
                    statusCode: StatusCodes.Status400BadRequest,
                    title: "Invalid catalogue sort.",
                    detail: $"Supported sortBy values are '{CardCatalogueSortOptions.SetOrder}' and '{CardCatalogueSortOptions.Name}'.");
            }

            if (!CardCatalogueSortOptions.IsSupportedDirection(query.SortDirection))
            {
                return Problem(
                    statusCode: StatusCodes.Status400BadRequest,
                    title: "Invalid catalogue sort direction.",
                    detail: $"Supported sortDirection values are '{CardCatalogueSortOptions.Ascending}' and '{CardCatalogueSortOptions.Descending}'.");
            }

            return null;
        }
    }
}
