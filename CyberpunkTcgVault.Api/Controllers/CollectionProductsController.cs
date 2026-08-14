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
    public class CollectionProductsController : ControllerBase
    {
        private readonly ICollectionProductService _collectionProductService;
        private readonly ICurrentUserService _currentUserService;

        public CollectionProductsController(
            ICollectionProductService collectionProductService,
            ICurrentUserService currentUserService)
        {
            _collectionProductService = collectionProductService;
            _currentUserService = currentUserService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CollectionProductResponse>>> GetCollectionProducts(
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.GetUserId();

            var products = await _collectionProductService.GetProductsAsync(
                userId,
                cancellationToken);

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CollectionProductResponse>> GetCollectionProductById(
            int id,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.GetUserId();

            var product = await _collectionProductService.GetProductByIdAsync(
                userId,
                id,
                cancellationToken);

            if (product is null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<CollectionProductResponse>> CreateCollectionProduct(
            CreateCollectionProductRequest request,
            CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(request.ProductName))
            {
                return BadRequest("Product Name is required");
            }

            var userId = _currentUserService.GetUserId();

            var response = await _collectionProductService.CreateProductAsync(
                userId,
                request,
                cancellationToken);

            return CreatedAtAction(
                nameof(GetCollectionProductById),
                new { id = response.Id },
                response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCollectionProduct(
            int id,
            UpdateCollectionProductRequest request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.GetUserId();

            var result = await _collectionProductService.UpdateProductAsync(
                userId,
                id,
                request,
                cancellationToken);

            return result switch
            {
                CollectionProductUpdateResult.Success => NoContent(),
                CollectionProductUpdateResult.NotFound => NotFound(),
                CollectionProductUpdateResult.InvalidProductName =>
                    BadRequest("Product Name is required"),
                _ => StatusCode(StatusCodes.Status500InternalServerError)
            };
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCollectionProduct(
            int id,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.GetUserId();

            var deleted = await _collectionProductService.DeleteProductAsync(
                userId,
                id,
                cancellationToken);

            return deleted
                ? NoContent()
                : NotFound();
        }
    }
}
