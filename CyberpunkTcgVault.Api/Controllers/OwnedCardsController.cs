using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CyberpunkTcgVault.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
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

            if (ownedCard is null)
            {
                return NotFound();
            }

            return Ok(ownedCard);
        }

        [HttpPost]
        public async Task<ActionResult<OwnedCardResponse>> CreateOwnedCard(
            CreateOwnedCardRequest request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.GetUserId();

            var response = await _ownedCardService.CreateOwnedCardAsync(
                userId,
                request,
                cancellationToken);

            if (response is null)
            {
                return BadRequest("Card printing does not exist");
            }

            return CreatedAtAction(
                nameof(GetOwnedCardById),
                new { id = response.Id },
                response);
        }

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
