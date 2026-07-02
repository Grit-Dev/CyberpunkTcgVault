using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CyberpunkTcgVault.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WishListItemController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<WishListItemController> _logger;

        public WishListItemController(AppDbContext context, ILogger<WishListItemController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WishListItem>>> GetWishListItems()
        {
            _logger.LogInformation("Received request to get all wishlist items.");

            var wishListItems = await _context.WishList
                .AsNoTracking()
                .Include(wl => wl.Card)
                .OrderBy(wl => wl.Card.Name)
                .ToListAsync();

            _logger.LogInformation("Retrieved {Count} wishListItems from the database.", wishListItems.Count);

            return Ok(wishListItems);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WishListItem>> GetWishListItemById(int id)
        {
            var wishlistItem = await _context.WishList
                .AsNoTracking()
                .Include(wls => wls.Card)
                .FirstOrDefaultAsync(wl => wl.Id == id);

            if (wishlistItem == null)
            {
                _logger.LogWarning("Wishlisted Item with ID {Id} not found.", id);
                return NotFound();
            }

            return Ok(wishlistItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWishListItem(int id, UpdateWishListItemRequest request)
        {
            var wishListItem = await _context.WishList.FirstOrDefaultAsync(wl => wl.Id == id);

            if (wishListItem == null)
            {
                return NotFound();
            }

            wishListItem.WantedQuantity = request.WantedQuantity;
            wishListItem.Priority = request.Priority?.Trim();
            wishListItem.ReasonWanted = request.ReasonWanted?.Trim();
            wishListItem.WantRaw = request.WantRaw;
            wishListItem.WantGraded = request.WantGraded;
            wishListItem.PreferredGradingCompany = request.PreferredGradingCompany?.Trim();
            wishListItem.IsOpenToTrade = request.IsOpenToTrade;
            wishListItem.Notes = request.Notes?.Trim();

            await _context.SaveChangesAsync();

            return NoContent();

        }

        [HttpPost]
        public async Task<ActionResult<WishListItem>> CreateWishListItem(CreateWishListItemRequest request)
        {
            // Check the card exists before creating a wishlist item.
            var cardExists = await _context.Cards.AnyAsync(card => card.Id == request.CardId);

            if (!cardExists)
            {
                return BadRequest("Wish List card does not exist");
            }

            var wishListItem = new WishListItem
            {
                CardId = request.CardId,
                WantedQuantity = request.WantedQuantity,
                Priority = request.Priority?.Trim(),
                ReasonWanted = request.ReasonWanted?.Trim(),
                WantRaw = request.WantRaw,
                WantGraded = request.WantGraded,
                PreferredGradingCompany = request.PreferredGradingCompany?.Trim(),
                IsOpenToTrade = request.IsOpenToTrade,
                Notes = request.Notes?.Trim()
            };

            await _context.WishList.AddAsync(wishListItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWishListItemById), new { id = wishListItem.Id }, wishListItem);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWishListItem(int id)
        {
            var wishListItem = await _context.WishList.FirstOrDefaultAsync(wl => wl.Id == id);

            if (wishListItem == null)
            {
                _logger.LogWarning("WishListItem with ID {WishListItemId} was not found.", id);
                return NotFound();
            }

            _context.WishList.Remove(wishListItem);

            await _context.SaveChangesAsync();

            _logger.LogInformation("Deleted WishListItem with ID {WishListItemId}.", id);

            return NoContent();
        }
    }
}
