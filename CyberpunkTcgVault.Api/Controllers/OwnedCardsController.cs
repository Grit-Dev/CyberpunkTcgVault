using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Security;
using CyberpunkTcgVault.Api.Services.Interfaces;
using CyberpunkTcgVault.Api.Services.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CyberpunkTcgVault.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    [ResponseCache(
        NoStore = true,
        Location = ResponseCacheLocation.None)]
    public class OwnedCardsController : ControllerBase
    {
        private readonly IOwnedCardService _ownedCardService;
        private readonly ICurrentUserService _currentUserService;

        public OwnedCardsController(
            IOwnedCardService ownedCardService,
            ICurrentUserService currentUserService)
        {
            _ownedCardService = ownedCardService;
            _currentUserService = currentUserService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OwnedCardResponse>>> GetOwnedCards(
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.GetUserId();

            var ownedCards = await _ownedCardService.GetOwnedCardsAsync(
                userId,
                cancellationToken);

            return Ok(ownedCards);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OwnedCardResponse>> GetOwnedCardById(
            int id,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.GetUserId();

            var ownedCard = await _ownedCardService.GetOwnedCardByIdAsync(
                userId,
                id,
                cancellationToken);

            return ownedCard is null
                ? NotFound()
                : Ok(ownedCard);
        }

        [Authorize(Policy = AuthorizationPolicies.CollectorWrite)]
        [HttpPost]
        public async Task<ActionResult<OwnedCardResponse>> CreateOwnedCard(
            CreateOwnedCardRequest request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.GetUserId();

            var result = await _ownedCardService.CreateOwnedCardAsync(
                userId,
                request,
                cancellationToken);

            if (result.Status == OwnedCardCreateStatus.CardPrintingNotFound)
            {
                return Problem(
                    statusCode: StatusCodes.Status400BadRequest,
                    title: "Invalid card printing.",
                    detail: "The requested card printing does not exist.");
            }

            if (result.Status == OwnedCardCreateStatus.Duplicate)
            {
                return Problem(
                    statusCode: StatusCodes.Status409Conflict,
                    title: "Card printing already owned.",
                    detail: "Change the quantity on the existing owned-card record instead of creating a duplicate row.");
            }

            var response = result.Item!;

            return CreatedAtAction(
                nameof(GetOwnedCardById),
                new { id = response.Id },
                response);
        }

        [Authorize(Policy = AuthorizationPolicies.CollectorWrite)]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOwnedCard(
            int id,
            UpdateOwnedCardRequest request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.GetUserId();

            var updated = await _ownedCardService.UpdateOwnedCardAsync(
                userId,
                id,
                request,
                cancellationToken);

            return updated
                ? NoContent()
                : NotFound();
        }

        // Demo is intentionally allowed to remove its own OwnedCard rows.
        // This affects only collector-owned data and never the shared
        // Card/CardPrinting catalogue.
        [Authorize(Policy = AuthorizationPolicies.CollectorWrite)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOwnedCard(
            int id,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.GetUserId();

            var deleted = await _ownedCardService.DeleteOwnedCardAsync(
                userId,
                id,
                cancellationToken);

            return deleted
                ? NoContent()
                : NotFound();
        }
    }
}
