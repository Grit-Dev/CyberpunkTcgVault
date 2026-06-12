using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// PMG TO DO: Adding Logging
namespace CyberpunkTcgVault.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CollectionProductController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<CollectionProductController> _logger;

        public CollectionProductController(AppDbContext context, ILogger<CollectionProductController> logger)
        {
            _context = context;
            _logger = logger;
        }

        //PMG TODO: TBC
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CollectionProduct>>> GetCollectionProducts()
        {
            var products = await _context.Products
                .OrderBy(p => p.ProductName)
                .ToListAsync();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CollectionProduct>> GetCollectionProductById(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(product => product.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<CollectionProduct>> CreateCollectionProduct(CreateCollectionProductRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.ProductName))
            {
                return BadRequest("Product Name is required");
            }

            var collectionProduct = new CollectionProduct
            {
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

            return CreatedAtAction(nameof(GetCollectionProductById), new { id = collectionProduct.Id }, collectionProduct);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCollectionProduct(int id, UpdateCollectionProductRequest request)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);

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
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);

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
