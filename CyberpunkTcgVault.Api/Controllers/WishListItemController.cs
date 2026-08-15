using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Services.Interfaces;
using CyberpunkTcgVault.Api.Services.Results;
using CyberpunkTcgVault.Api.Security;
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

        [Authorize(Policy = AuthorizationPolicies.CollectorWrite)]
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
                return Problem(
                    statusCode: StatusCodes.Status400BadRequest,
                    title: "Card printing does not exist.");
            }

            if (result.Status ==
                WishListItemCreateStatus.Duplicate)
            {
                return Problem(
                    statusCode: StatusCodes.Status409Conflict,
                    title: "Wishlist item already exists.",
                    detail: "This card printing is already on your wishlist.");
            }

            var response = result.Item!;

            return CreatedAtAction(
                nameof(GetWishListItemById),
                new { id = response.Id },
                response);
        }

        [Authorize(Policy = AuthorizationPolicies.CollectorWrite)]
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

        [Authorize(Policy = AuthorizationPolicies.CollectorWrite)]
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
