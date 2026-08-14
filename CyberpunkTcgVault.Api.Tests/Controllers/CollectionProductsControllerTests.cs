using CyberpunkTcgVault.Api.Controllers;
using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Tests.TestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;
using CyberpunkTcgVault.Api.Services;

namespace CyberpunkTcgVault.Api.Tests.Controllers
{
    public class CollectionProductsControllerTests
    {
        private static CollectionProductsController CreateController(
            AppDbContext context,
            Guid userId)
        {
            var collectionProductService = new CollectionProductService(
                context,
                NullLogger<CollectionProductService>.Instance);

            var currentUserService =
                new TestCurrentUserService(userId);

            return new CollectionProductsController(
                collectionProductService,
                currentUserService);
        }

        private static AppUser CreateTestUser()
        {
            var userId = Guid.NewGuid();

            return new AppUser
            {
                Id = userId,
                UserName = $"test-user-{userId}",
                PasswordHash = "hashed-password"
            };
        }

        [Fact]
        public async Task GetCollectionProducts_WhenProductsExist_ReturnOkWithProductResponses()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var product = new CollectionProduct
            {
                UserId = user.Id,
                ProductName = "Product A",
                Quantity = 1
            };

            context.Products.Add(product);
            await context.SaveChangesAsync();

            var controller = CreateController(context, user.Id);

            // Act
            var result = await controller.GetCollectionProducts(CancellationToken.None);

            // Assert
            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var items = Assert.IsAssignableFrom<IEnumerable<CollectionProductResponse>>(ok.Value);

            Assert.Contains(items, productResponse => productResponse.ProductName == "Product A");
        }

        [Fact]
        public async Task GetCollectionProducts_WhenOtherUsersHaveProducts_DoesNotReturnOtherUsersProducts()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var userOne = CreateTestUser();
            var userTwo = CreateTestUser();

            context.Users.AddRange(userOne, userTwo);
            await context.SaveChangesAsync();

            var userOneProduct = new CollectionProduct
            {
                UserId = userOne.Id,
                ProductName = "User One Product",
                Quantity = 1
            };

            var userTwoProduct = new CollectionProduct
            {
                UserId = userTwo.Id,
                ProductName = "User Two Product",
                Quantity = 5
            };

            context.Products.AddRange(userOneProduct, userTwoProduct);
            await context.SaveChangesAsync();

            var controller = CreateController(context, userOne.Id);

            // Act
            var result = await controller.GetCollectionProducts(CancellationToken.None);

            // Assert
            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var items = Assert.IsAssignableFrom<IEnumerable<CollectionProductResponse>>(ok.Value);

            Assert.Contains(items, productResponse => productResponse.Id == userOneProduct.Id);
            Assert.DoesNotContain(items, productResponse => productResponse.Id == userTwoProduct.Id);
        }

        [Fact]
        public async Task GetCollectionProductById_WhenExistsForLoggedInUser_ReturnsOk()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var product = new CollectionProduct
            {
                UserId = user.Id,
                ProductName = "ById Product",
                Quantity = 2
            };

            context.Products.Add(product);
            await context.SaveChangesAsync();

            var controller = CreateController(context, user.Id);

            // Act
            var result = await controller.GetCollectionProductById(product.Id, CancellationToken.None);

            // Assert
            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var returned = Assert.IsType<CollectionProductResponse>(ok.Value);

            Assert.Equal(product.Id, returned.Id);
            Assert.Equal("ById Product", returned.ProductName);
        }

        [Fact]
        public async Task GetCollectionProductById_WhenOwnedByDifferentUser_ReturnsNotFound()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var owner = CreateTestUser();
            var otherUser = CreateTestUser();

            context.Users.AddRange(owner, otherUser);
            await context.SaveChangesAsync();

            var product = new CollectionProduct
            {
                UserId = owner.Id,
                ProductName = "Private Product",
                Quantity = 1
            };

            context.Products.Add(product);
            await context.SaveChangesAsync();

            var controller = CreateController(context, otherUser.Id);

            // Act
            var result = await controller.GetCollectionProductById(product.Id, CancellationToken.None);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task CreateCollectionProduct_WhenRequestIsValid_CreatesProductForLoggedInUser()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var controller = CreateController(context, user.Id);

            var request = new CreateCollectionProductRequest
            {
                ProductName = "   Trimmed Product   ",
                Quantity = 2,
                IsSealed = true
            };

            // Act
            var result = await controller.CreateCollectionProduct(request, CancellationToken.None);

            // Assert
            var created = Assert.IsType<CreatedAtActionResult>(result.Result);
            var response = Assert.IsType<CollectionProductResponse>(created.Value);

            Assert.Equal("Trimmed Product", response.ProductName);
            Assert.Equal(2, response.Quantity);
            Assert.True(response.IsSealed);

            var savedProduct = Assert.Single(context.Products);

            Assert.Equal(user.Id, savedProduct.UserId);
            Assert.Equal("Trimmed Product", savedProduct.ProductName);
            Assert.Equal(2, savedProduct.Quantity);
            Assert.True(savedProduct.IsSealed);
        }

        [Fact]
        public async Task CreateCollectionProduct_WhenNameMissing_ReturnsBadRequest()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var controller = CreateController(context, user.Id);

            var request = new CreateCollectionProductRequest
            {
                ProductName = "   "
            };

            // Act
            var result = await controller.CreateCollectionProduct(request, CancellationToken.None);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public async Task UpdateCollectionProduct_WhenExistsForLoggedInUser_UpdatesProduct()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var product = new CollectionProduct
            {
                UserId = user.Id,
                ProductName = "Old Name",
                Quantity = 1,
                IsSealed = true
            };

            context.Products.Add(product);
            await context.SaveChangesAsync();

            var controller = CreateController(context, user.Id);

            var request = new UpdateCollectionProductRequest
            {
                ProductName = "   New Name   ",
                Quantity = 5,
                IsSealed = false
            };

            // Act
            var result = await controller.UpdateCollectionProduct(product.Id, request, CancellationToken.None);

            // Assert
            Assert.IsType<NoContentResult>(result);

            var updated = await context.Products.FindAsync(product.Id);

            Assert.NotNull(updated);
            Assert.Equal("New Name", updated!.ProductName);
            Assert.Equal(5, updated.Quantity);
            Assert.False(updated.IsSealed);
        }

        [Fact]
        public async Task UpdateCollectionProduct_WhenOwnedByDifferentUser_ReturnsNotFound()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var owner = CreateTestUser();
            var otherUser = CreateTestUser();

            context.Users.AddRange(owner, otherUser);
            await context.SaveChangesAsync();

            var product = new CollectionProduct
            {
                UserId = owner.Id,
                ProductName = "Protected Product",
                Quantity = 1
            };

            context.Products.Add(product);
            await context.SaveChangesAsync();

            var controller = CreateController(context, otherUser.Id);

            var request = new UpdateCollectionProductRequest
            {
                ProductName = "Hacked Product",
                Quantity = 99
            };

            // Act
            var result = await controller.UpdateCollectionProduct(product.Id, request, CancellationToken.None);

            // Assert
            Assert.IsType<NotFoundResult>(result);

            var unchanged = await context.Products.FindAsync(product.Id);

            Assert.NotNull(unchanged);
            Assert.Equal("Protected Product", unchanged!.ProductName);
            Assert.Equal(1, unchanged.Quantity);
        }

        [Fact]
        public async Task UpdateCollectionProduct_WhenNotExists_ReturnsNotFound()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var controller = CreateController(context, user.Id);

            var request = new UpdateCollectionProductRequest
            {
                ProductName = "Name",
                Quantity = 1
            };

            // Act
            var result = await controller.UpdateCollectionProduct(999, request, CancellationToken.None);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task UpdateCollectionProduct_WhenNameMissing_ReturnsBadRequest()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var product = new CollectionProduct
            {
                UserId = user.Id,
                ProductName = "ToUpdate",
                Quantity = 1
            };

            context.Products.Add(product);
            await context.SaveChangesAsync();

            var controller = CreateController(context, user.Id);

            var request = new UpdateCollectionProductRequest
            {
                ProductName = "   ",
                Quantity = 1
            };

            // Act
            var result = await controller.UpdateCollectionProduct(product.Id, request, CancellationToken.None);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task DeleteCollectionProduct_WhenExistsForLoggedInUser_RemovesProduct()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var product = new CollectionProduct
            {
                UserId = user.Id,
                ProductName = "DeleteMe",
                Quantity = 1
            };

            context.Products.Add(product);
            await context.SaveChangesAsync();

            var controller = CreateController(context, user.Id);

            // Act
            var result = await controller.DeleteCollectionProduct(product.Id, CancellationToken.None);

            // Assert
            Assert.IsType<NoContentResult>(result);

            var deleted = await context.Products.FindAsync(product.Id);

            Assert.Null(deleted);
        }

        [Fact]
        public async Task DeleteCollectionProduct_WhenOwnedByDifferentUser_ReturnsNotFound()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var owner = CreateTestUser();
            var otherUser = CreateTestUser();

            context.Users.AddRange(owner, otherUser);
            await context.SaveChangesAsync();

            var product = new CollectionProduct
            {
                UserId = owner.Id,
                ProductName = "Protected Delete Product",
                Quantity = 1
            };

            context.Products.Add(product);
            await context.SaveChangesAsync();

            var controller = CreateController(context, otherUser.Id);

            // Act
            var result = await controller.DeleteCollectionProduct(product.Id, CancellationToken.None);

            // Assert
            Assert.IsType<NotFoundResult>(result);

            var stillExists = await context.Products.FindAsync(product.Id);

            Assert.NotNull(stillExists);
        }

        [Fact]
        public async Task DeleteCollectionProduct_WhenNotExists_ReturnsNotFound()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var controller = CreateController(context, user.Id);

            // Act
            var result = await controller.DeleteCollectionProduct(999, CancellationToken.None);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}