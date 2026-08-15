using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Services.Interfaces;
using CyberpunkTcgVault.Api.Services.Results;
using Microsoft.EntityFrameworkCore;

namespace CyberpunkTcgVault.Api.Services
{
    public class CollectionProductService : ICollectionProductService
    {
        private readonly AppDbContext _context;
        private readonly ILogger<CollectionProductService> _logger;

        public CollectionProductService(
            AppDbContext context,
            ILogger<CollectionProductService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IReadOnlyList<CollectionProductResponse>> GetProductsAsync(
            Guid userId,
            CancellationToken cancellationToken)
        {
            var products = await ProjectProducts(
                    _context.Products
                        .AsNoTracking()
                        .Where(product => product.UserId == userId))
                .OrderBy(product => product.ProductName)
                .ToListAsync(cancellationToken);

            _logger.LogInformation(
                "Retrieved {Count} collection products for user {UserId}.",
                products.Count,
                userId);

            return products;
        }

        public async Task<CollectionProductResponse?> GetProductByIdAsync(
            Guid userId,
            int id,
            CancellationToken cancellationToken)
        {
            return await ProjectProducts(
                    _context.Products
                        .AsNoTracking()
                        .Where(product =>
                            product.Id == id &&
                            product.UserId == userId))
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<CollectionProductCreateResult> CreateProductAsync(
            Guid userId,
            CreateCollectionProductRequest request,
            CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(request.ProductName))
            {
                return new CollectionProductCreateResult
                {
                    Status = CollectionProductCreateStatus.InvalidProductName
                };
            }

            var product = new CollectionProduct
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

            await _context.Products.AddAsync(
                product,
                cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation(
                "Created collection product {ProductId} for user {UserId}.",
                product.Id,
                userId);

            return new CollectionProductCreateResult
            {
                Status = CollectionProductCreateStatus.Created,
                Item = MapProduct(product)
            };
        }

        public async Task<CollectionProductUpdateResult> UpdateProductAsync(
            Guid userId,
            int id,
            UpdateCollectionProductRequest request,
            CancellationToken cancellationToken)
        {
            var product = await _context.Products
                .FirstOrDefaultAsync(
                    product =>
                        product.Id == id &&
                        product.UserId == userId,
                    cancellationToken);

            if (product is null)
            {
                return CollectionProductUpdateResult.NotFound;
            }

            if (string.IsNullOrWhiteSpace(request.ProductName))
            {
                return CollectionProductUpdateResult.InvalidProductName;
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

            await _context.SaveChangesAsync(cancellationToken);

            return CollectionProductUpdateResult.Success;
        }

        public async Task<bool> DeleteProductAsync(
            Guid userId,
            int id,
            CancellationToken cancellationToken)
        {
            var product = await _context.Products
                .FirstOrDefaultAsync(
                    product =>
                        product.Id == id &&
                        product.UserId == userId,
                    cancellationToken);

            if (product is null)
            {
                return false;
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation(
                "Deleted collection product {ProductId} for user {UserId}.",
                id,
                userId);

            return true;
        }

        private static IQueryable<CollectionProductResponse> ProjectProducts(
            IQueryable<CollectionProduct> query)
        {
            return query.Select(product => new CollectionProductResponse
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
            });
        }

        private static CollectionProductResponse MapProduct(
            CollectionProduct product)
        {
            return new CollectionProductResponse
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
            };
        }
    }
}
