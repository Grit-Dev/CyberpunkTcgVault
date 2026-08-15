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

            return product is null
                ? NotFound()
                : Ok(product);
        }

        // Demo can edit its seeded sealed products but cannot create/delete
        // sealed-product records under the currently approved product rule.
        [Authorize(Policy = AuthorizationPolicies.CollectorProductCreateDelete)]
        [HttpPost]
        public async Task<ActionResult<CollectionProductResponse>> CreateCollectionProduct(
            CreateCollectionProductRequest request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.GetUserId();

            var result = await _collectionProductService.CreateProductAsync(
                userId,
                request,
                cancellationToken);

            return result.Status switch
            {
                CollectionProductCreateStatus.Created => CreatedAtAction(
                    nameof(GetCollectionProductById),
                    new { id = result.Item!.Id },
                    result.Item),
                CollectionProductCreateStatus.InvalidProductName => Problem(
                    statusCode: StatusCodes.Status400BadRequest,
                    title: "Invalid product name.",
                    detail: "Product name is required."),
                _ => Problem(
                    statusCode: StatusCodes.Status500InternalServerError,
                    title: "Unable to create collection product.")
            };
        }

        [Authorize(Policy = AuthorizationPolicies.CollectorWrite)]
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
                CollectionProductUpdateResult.InvalidProductName => Problem(
                    statusCode: StatusCodes.Status400BadRequest,
                    title: "Invalid product name.",
                    detail: "Product name is required."),
                _ => Problem(
                    statusCode: StatusCodes.Status500InternalServerError,
                    title: "Unable to update collection product.")
            };
        }

        [Authorize(Policy = AuthorizationPolicies.CollectorProductCreateDelete)]
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
