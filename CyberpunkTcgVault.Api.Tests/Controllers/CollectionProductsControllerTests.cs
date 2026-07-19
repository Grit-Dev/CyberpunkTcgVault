using CyberpunkTcgVault.Api.Controllers;
using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Tests.TestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;

namespace CyberpunkTcgVault.Api.Tests.Controllers
{
    public class CollectionProductsControllerTests
    {
        private static CollectionProductsController CreateController(AppDbContext context)
        {
            return new CollectionProductsController(context, NullLogger<CollectionProductsController>.Instance);
        }

        [Fact]
        public async Task GetCollectionProducts_WhenProductsExist_ReturnOkWithProducts()
        {
            var context = TestDbContextFactory.Create();

            var product = new CollectionProduct { ProductName = "Product A", Quantity = 1 };
            context.Products.Add(product);
            await context.SaveChangesAsync();

            var controller = CreateController(context);

            var result = await controller.GetCollectionProducts();

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var items = Assert.IsAssignableFrom<IEnumerable<CollectionProduct>>(ok.Value);
            Assert.Contains(items, p => p.ProductName == "Product A");
        }

        [Fact]
        public async Task GetCollectionProductById_WhenExists_ReturnsOk()
        {
            var context = TestDbContextFactory.Create();
            var product = new CollectionProduct { ProductName = "ById Product" };
            context.Products.Add(product);
            await context.SaveChangesAsync();

            var controller = CreateController(context);

            var result = await controller.GetCollectionProductById(product.Id);

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var returned = Assert.IsType<CollectionProduct>(ok.Value);
            Assert.Equal(product.Id, returned.Id);
        }

        [Fact]
        public async Task CreateCollectionProduct_WhenRequestIsValid_CreatesProduct()
        {
            var context = TestDbContextFactory.Create();
            var controller = CreateController(context);

            var request = new CreateCollectionProductRequest
            {
                ProductName = "   Trimmed Product   ",
                Quantity = 2,
                IsSealed = true
            };

            var result = await controller.CreateCollectionProduct(request);

            var created = Assert.IsType<CreatedAtActionResult>(result.Result);
            var createdProduct = Assert.IsType<CollectionProduct>(created.Value);

            Assert.Equal("Trimmed Product", createdProduct.ProductName);
            Assert.Equal(2, createdProduct.Quantity);
            Assert.True(createdProduct.IsSealed);
            Assert.Contains(context.Products, p => p.Id == createdProduct.Id);
        }

        [Fact]
        public async Task CreateCollectionProduct_WhenNameMissing_ReturnsBadRequest()
        {
            var context = TestDbContextFactory.Create();
            var controller = CreateController(context);

            var request = new CreateCollectionProductRequest { ProductName = "   " };

            var result = await controller.CreateCollectionProduct(request);

            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public async Task UpdateCollectionProduct_WhenExists_UpdatesProduct()
        {
            var context = TestDbContextFactory.Create();
            var product = new CollectionProduct { ProductName = "Old Name", Quantity = 1 };
            context.Products.Add(product);
            await context.SaveChangesAsync();

            var controller = CreateController(context);

            var request = new UpdateCollectionProductRequest
            {
                ProductName = "   New Name   ",
                Quantity = 5,
                IsSealed = false
            };

            var result = await controller.UpdateCollectionProduct(product.Id, request);

            Assert.IsType<NoContentResult>(result);

            var updated = await context.Products.FindAsync(product.Id);
            Assert.Equal("New Name", updated?.ProductName);
            Assert.Equal(5, updated?.Quantity);
            Assert.False(updated?.IsSealed);
        }

        [Fact]
        public async Task UpdateCollectionProduct_WhenNotExists_ReturnsNotFound()
        {
            var context = TestDbContextFactory.Create();
            var controller = CreateController(context);

            var request = new UpdateCollectionProductRequest { ProductName = "Name", Quantity = 1 };

            var result = await controller.UpdateCollectionProduct(999, request);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task UpdateCollectionProduct_WhenNameMissing_ReturnsBadRequest()
        {
            var context = TestDbContextFactory.Create();
            var product = new CollectionProduct { ProductName = "ToUpdate" };
            context.Products.Add(product);
            await context.SaveChangesAsync();

            var controller = CreateController(context);

            var request = new UpdateCollectionProductRequest { ProductName = "   ", Quantity = 1 };

            var result = await controller.UpdateCollectionProduct(product.Id, request);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task DeleteCollectionProduct_WhenExists_RemovesProduct()
        {
            var context = TestDbContextFactory.Create();
            var product = new CollectionProduct { ProductName = "DeleteMe" };
            context.Products.Add(product);
            await context.SaveChangesAsync();

            var controller = CreateController(context);

            var result = await controller.DeleteCollectionProduct(product.Id);

            Assert.IsType<NoContentResult>(result);
            var deleted = await context.Products.FindAsync(product.Id);
            Assert.Null(deleted);
        }

        [Fact]
        public async Task DeleteCollectionProduct_WhenNotExists_ReturnsNotFound()
        {
            var context = TestDbContextFactory.Create();
            var controller = CreateController(context);

            var result = await controller.DeleteCollectionProduct(999);

            Assert.IsType<NotFoundResult>(result);
        }
    }
}