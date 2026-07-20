using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

// PMG TO DO: Adding Logging
namespace CyberpunkTcgVault.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CollectionProductsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<CollectionProductsController> _logger;

        public CollectionProductsController(AppDbContext context, ILogger<CollectionProductsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // Look inside the JWT. Find the logged-in user's ID. Convert it back into a Guid. Return it
        private Guid GetLoggedInUserId()
        {
            var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!Guid.TryParse(userIdValue, out var userId))
            {
                throw new InvalidOperationException("User ID claim was not found or was invalid.");
            }

            return userId;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CollectionProductResponse>>> GetCollectionProducts()
        {
            var userId = GetLoggedInUserId();

            _logger.LogInformation("Received request to get owned cards for user {UserId}.", userId);

            var products = await _context.Products
                .AsNoTracking()
                .Where(product => product.UserId == userId)
                .OrderBy(p => p.ProductName)
                .Select(product => new CollectionProductResponse
                { 
                    Id = product.Id,
                    ProductName = product.ProductName,
                    ProductType = product.ProductType,
                    Edition = product.Edition,
                    Quantity = product.Quantity,
                    IsSealed = product.IsSealed,
                    IsBetaProduct = product.IsBetaProduct,
                    IsKickstarterProduct = product.IsKickstarterProduct,
                    IsRetailProduct = product.IsRetailProduct,
                    IsPledgeItem = product.IsPledgeItem,
                    PurchaseCost = product.PurchaseCost,
                    ShippingCost = product.ShippingCost,
                    VatCost = product.VatCost,
                    EstimatedValue = product.EstimatedValue,
                    MinimumSellPrice = product.MinimumSellPrice,
                    StorageLocation = product.StorageLocation,
                    IsLongTermHold = product.IsLongTermHold,
                    IsOpenToTrade = product.IsOpenToTrade,
                    MaySellLater = product.MaySellLater,
                    ImageUrl = product.ImageUrl,
                    Notes = product.Notes

                })
                .ToListAsync();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CollectionProductResponse>> GetCollectionProductById(int id)
        {
            var userId = GetLoggedInUserId();

            var product = await _context.Products
            .AsNoTracking()
            .Where(product =>
                product.Id == id &&
                product.UserId == userId)
            .Select(product => new CollectionProductResponse
            {
                Id = product.Id,
                ProductName = product.ProductName,
                ProductType = product.ProductType,
                Edition = product.Edition,
                Quantity = product.Quantity,
                IsSealed = product.IsSealed,
                IsBetaProduct = product.IsBetaProduct,
                IsKickstarterProduct = product.IsKickstarterProduct,
                IsRetailProduct = product.IsRetailProduct,
                IsPledgeItem = product.IsPledgeItem,
                PurchaseCost = product.PurchaseCost,
                ShippingCost = product.ShippingCost,
                VatCost = product.VatCost,
                EstimatedValue = product.EstimatedValue,
                MinimumSellPrice = product.MinimumSellPrice,
                StorageLocation = product.StorageLocation,
                IsLongTermHold = product.IsLongTermHold,
                IsOpenToTrade = product.IsOpenToTrade,
                MaySellLater = product.MaySellLater,
                ImageUrl = product.ImageUrl,
                Notes = product.Notes
            })
            .FirstOrDefaultAsync();

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product); ;
        }

        [HttpPost]
        public async Task<ActionResult<CollectionProduct>> CreateCollectionProduct(CreateCollectionProductRequest request)
        {
            var userId = GetLoggedInUserId();

            if (string.IsNullOrWhiteSpace(request.ProductName))
            {
                return BadRequest("Product Name is required");
            }


            var collectionProduct = new CollectionProduct
            {
                UserId = userId,
                ProductName = request.ProductName.Trim(),
                ProductType = request.ProductType?.Trim(),
                Edition = request.Edition?.Trim(),
                Quantity = request.Quantity,
                IsSealed = request.IsSealed,
                IsBetaProduct = request.IsBetaProduct,
                IsKickstarterProduct = request.IsKickstarterProduct,
                IsRetailProduct = request.IsRetailProduct,
                IsPledgeItem = request.IsPledgeItem,
                PurchaseCost = request.PurchaseCost,
                ShippingCost = request.ShippingCost,
                VatCost = request.VatCost,
                EstimatedValue = request.EstimatedValue,
                MinimumSellPrice = request.MinimumSellPrice,
                StorageLocation = request.StorageLocation?.Trim(),
                IsLongTermHold = request.IsLongTermHold,
                IsOpenToTrade = request.IsOpenToTrade,
                MaySellLater = request.MaySellLater,
                ImageUrl = request.ImageUrl?.Trim(),
                Notes = request.Notes?.Trim()
            };

            _context.Products.Add(collectionProduct);
            await _context.SaveChangesAsync();

            var response = new CollectionProductResponse
            {
                Id = collectionProduct.Id,
                ProductName = collectionProduct.ProductName,
                ProductType = collectionProduct.ProductType,
                Edition = collectionProduct.Edition,
                Quantity = collectionProduct.Quantity,
                IsSealed = collectionProduct.IsSealed,
                IsBetaProduct = collectionProduct.IsBetaProduct,
                IsKickstarterProduct = collectionProduct.IsKickstarterProduct,
                IsRetailProduct = collectionProduct.IsRetailProduct,
                IsPledgeItem = collectionProduct.IsPledgeItem,
                PurchaseCost = collectionProduct.PurchaseCost,
                ShippingCost = collectionProduct.ShippingCost,
                VatCost = collectionProduct.VatCost,
                EstimatedValue = collectionProduct.EstimatedValue,
                MinimumSellPrice = collectionProduct.MinimumSellPrice,
                StorageLocation = collectionProduct.StorageLocation,
                IsLongTermHold = collectionProduct.IsLongTermHold,
                IsOpenToTrade = collectionProduct.IsOpenToTrade,
                MaySellLater = collectionProduct.MaySellLater,
                ImageUrl = collectionProduct.ImageUrl,
                Notes = collectionProduct.Notes
            };

            return CreatedAtAction(nameof(GetCollectionProductById), new { id = collectionProduct.Id }, response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCollectionProduct(int id, UpdateCollectionProductRequest request)
        {
            var userId = GetLoggedInUserId();

            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.Id == id &&
                p.UserId == userId);

            if (product == null)
            {
                return NotFound();
            }

            if (string.IsNullOrWhiteSpace(request.ProductName))
            {
                return BadRequest("Product Name is required");
            }

            product.ProductName = request.ProductName.Trim();
            product.ProductType = request.ProductType?.Trim();
            product.Edition = request.Edition?.Trim();
            product.Quantity = request.Quantity;
            product.IsSealed = request.IsSealed;
            product.IsBetaProduct = request.IsBetaProduct;
            product.IsKickstarterProduct = request.IsKickstarterProduct;
            product.IsRetailProduct = request.IsRetailProduct;
            product.IsPledgeItem = request.IsPledgeItem;
            product.PurchaseCost = request.PurchaseCost;
            product.ShippingCost = request.ShippingCost;
            product.VatCost = request.VatCost;
            product.EstimatedValue = request.EstimatedValue;
            product.MinimumSellPrice = request.MinimumSellPrice;
            product.StorageLocation = request.StorageLocation?.Trim();
            product.IsLongTermHold = request.IsLongTermHold;
            product.IsOpenToTrade = request.IsOpenToTrade;
            product.MaySellLater = request.MaySellLater;
            product.ImageUrl = request.ImageUrl?.Trim();
            product.Notes = request.Notes?.Trim();

            await _context.SaveChangesAsync();

            return NoContent();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCollectionProduct(int id)
        { 
            var userId = GetLoggedInUserId();

            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.Id == id &&
                p.UserId == userId);

            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
