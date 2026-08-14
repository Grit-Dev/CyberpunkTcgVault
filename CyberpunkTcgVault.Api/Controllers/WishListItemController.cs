using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Services.Interfaces;
using CyberpunkTcgVault.Api.Services.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CyberpunkTcgVault.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class WishListItemController : ControllerBase
    {
        private readonly IWishListItemService _wishListItemService;
        private readonly ICurrentUserService _currentUserService;

        public WishListItemController(
            IWishListItemService wishListItemService,
            ICurrentUserService currentUserService)
        {
            _wishListItemService = wishListItemService;
            _currentUserService = currentUserService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WishListItemResponse>>> GetWishListItems(
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.GetUserId();

            var items = await _wishListItemService.GetWishListItemsAsync(
                userId,
                cancellationToken);

            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WishListItemResponse>> GetWishListItemById(
            int id,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.GetUserId();

            var item = await _wishListItemService.GetWishListItemByIdAsync(
                userId,
                id,
                cancellationToken);

            if (item is null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult<WishListItemResponse>> CreateWishListItem(
            CreateWishListItemRequest request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.GetUserId();

            var result = await _wishListItemService.CreateWishListItemAsync(
                userId,
                request,
                cancellationToken);

            if (result.Status ==
                WishListItemCreateStatus.CardPrintingNotFound)
            {
                return BadRequest(
                    "Card printing does not exist");
            }

            if (result.Status ==
                WishListItemCreateStatus.Duplicate)
            {
                return Conflict(
                    "This card printing is already on your wishlist.");
            }

            var response = result.Item!;

            return CreatedAtAction(
                nameof(GetWishListItemById),
                new { id = response.Id },
                response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWishListItem(
            int id,
            UpdateWishListItemRequest request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.GetUserId();

            var updated = await _wishListItemService.UpdateWishListItemAsync(
                userId,
                id,
                request,
                cancellationToken);

            return updated
                ? NoContent()
                : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWishListItem(
            int id,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.GetUserId();

            var deleted = await _wishListItemService.DeleteWishListItemAsync(
                userId,
                id,
                cancellationToken);

            return deleted
                ? NoContent()
                : NotFound();
        }
    }
}