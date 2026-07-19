using CyberpunkTcgVault.Api.Controllers;
using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Tests.TestHelpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;
using System.Security.Claims;

namespace CyberpunkTcgVault.Api.Tests.Controllers
{
    public class WishListItemControllerTests
    {
        private static WishListItemController CreateController(AppDbContext context, Guid userId)
        {
            var controller = new WishListItemController(context, NullLogger<WishListItemController>.Instance)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext
                    {
                        User = new ClaimsPrincipal(new ClaimsIdentity(
                        [
                            new Claim(ClaimTypes.NameIdentifier, userId.ToString())
                        ], "TestAuth"))
                    }
                }
            };

            return controller;
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
        public async Task GetWishListItems_WhenItemsExist_ReturnsOkWithItemResponses()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();
            var card = new Card { Name = "Wish Card" };

            context.Users.Add(user);
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var item = new WishListItem
            {
                UserId = user.Id,
                CardId = card.Id,
                WantedQuantity = 2,
                Priority = "High"
            };

            context.WishList.Add(item);
            await context.SaveChangesAsync();

            var controller = CreateController(context, user.Id);

            // Act
            var result = await controller.GetWishListItems();

            // Assert
            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var items = Assert.IsAssignableFrom<IEnumerable<WishListItemResponse>>(ok.Value);

            Assert.Contains(items, wishListItem =>
                wishListItem.CardId == card.Id &&
                wishListItem.WantedQuantity == 2);
        }

        [Fact]
        public async Task GetWishListItems_WhenOtherUsersHaveItems_DoesNotReturnOtherUsersItems()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var userOne = CreateTestUser();
            var userTwo = CreateTestUser();

            var card = new Card { Name = "Shared Wish Card" };

            context.Users.AddRange(userOne, userTwo);
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var userOneItem = new WishListItem
            {
                UserId = userOne.Id,
                CardId = card.Id,
                WantedQuantity = 1
            };

            var userTwoItem = new WishListItem
            {
                UserId = userTwo.Id,
                CardId = card.Id,
                WantedQuantity = 5
            };

            context.WishList.AddRange(userOneItem, userTwoItem);
            await context.SaveChangesAsync();

            var controller = CreateController(context, userOne.Id);

            // Act
            var result = await controller.GetWishListItems();

            // Assert
            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var items = Assert.IsAssignableFrom<IEnumerable<WishListItemResponse>>(ok.Value);

            Assert.Contains(items, wishListItem => wishListItem.Id == userOneItem.Id);
            Assert.DoesNotContain(items, wishListItem => wishListItem.Id == userTwoItem.Id);
        }

        [Fact]
        public async Task GetWishListItemById_WhenExistsForLoggedInUser_ReturnsOk()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();
            var card = new Card { Name = "ById Card" };

            context.Users.Add(user);
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var item = new WishListItem
            {
                UserId = user.Id,
                CardId = card.Id,
                WantedQuantity = 1
            };

            context.WishList.Add(item);
            await context.SaveChangesAsync();

            var controller = CreateController(context, user.Id);

            // Act
            var result = await controller.GetWishListItemById(item.Id);

            // Assert
            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var returned = Assert.IsType<WishListItemResponse>(ok.Value);

            Assert.Equal(item.Id, returned.Id);
            Assert.Equal(card.Id, returned.CardId);
            Assert.Equal("ById Card", returned.CardName);
        }

        [Fact]
        public async Task GetWishListItemById_WhenOwnedByDifferentUser_ReturnsNotFound()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var owner = CreateTestUser();
            var otherUser = CreateTestUser();

            var card = new Card { Name = "Private Wish Card" };

            context.Users.AddRange(owner, otherUser);
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var item = new WishListItem
            {
                UserId = owner.Id,
                CardId = card.Id,
                WantedQuantity = 1
            };

            context.WishList.Add(item);
            await context.SaveChangesAsync();

            var controller = CreateController(context, otherUser.Id);

            // Act
            var result = await controller.GetWishListItemById(item.Id);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task CreateWishListItem_WhenCardExists_CreatesItemForLoggedInUser()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();
            var card = new Card { Name = "Create Card" };

            context.Users.Add(user);
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var controller = CreateController(context, user.Id);

            var request = new CreateWishListItemRequest
            {
                CardId = card.Id,
                WantedQuantity = 3,
                Priority = "   Urgent   ",
                ReasonWanted = "   Complete Set   ",
                WantRaw = true,
                WantGraded = false,
                PreferredGradingCompany = "  PSA  ",
                IsOpenToTrade = true,
                Notes = "  contact me  "
            };

            // Act
            var result = await controller.CreateWishListItem(request);

            // Assert
            var created = Assert.IsType<CreatedAtActionResult>(result.Result);
            var response = Assert.IsType<WishListItemResponse>(created.Value);

            Assert.Equal(card.Id, response.CardId);
            Assert.Equal("Create Card", response.CardName);
            Assert.Equal(3, response.WantedQuantity);
            Assert.Equal("Urgent", response.Priority);
            Assert.Equal("Complete Set", response.ReasonWanted);
            Assert.True(response.WantRaw);
            Assert.False(response.WantGraded);
            Assert.Equal("PSA", response.PreferredGradingCompany);
            Assert.True(response.IsOpenToTrade);
            Assert.Equal("contact me", response.Notes);

            var savedItem = Assert.Single(context.WishList);

            Assert.Equal(user.Id, savedItem.UserId);
            Assert.Equal(card.Id, savedItem.CardId);
            Assert.Equal(3, savedItem.WantedQuantity);
            Assert.Equal("Urgent", savedItem.Priority);
        }

        [Fact]
        public async Task CreateWishListItem_WhenCardDoesNotExist_ReturnsBadRequest()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var controller = CreateController(context, user.Id);

            var request = new CreateWishListItemRequest
            {
                CardId = 999,
                WantedQuantity = 1
            };

            // Act
            var result = await controller.CreateWishListItem(request);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public async Task UpdateWishListItem_WhenExistsForLoggedInUser_UpdatesItem()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();
            var card = new Card { Name = "Update Card" };

            context.Users.Add(user);
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var item = new WishListItem
            {
                UserId = user.Id,
                CardId = card.Id,
                WantedQuantity = 1,
                Priority = "Low",
                ReasonWanted = "Old",
                WantRaw = false,
                WantGraded = false,
                PreferredGradingCompany = null,
                IsOpenToTrade = false,
                Notes = null
            };

            context.WishList.Add(item);
            await context.SaveChangesAsync();

            var controller = CreateController(context, user.Id);

            var request = new UpdateWishListItemRequest
            {
                WantedQuantity = 5,
                Priority = "   High   ",
                ReasonWanted = "   New Reason   ",
                WantRaw = true,
                WantGraded = true,
                PreferredGradingCompany = "  BGS  ",
                IsOpenToTrade = true,
                Notes = "  updated notes  "
            };

            // Act
            var result = await controller.UpdateWishListItem(item.Id, request);

            // Assert
            Assert.IsType<NoContentResult>(result);

            var updated = await context.WishList.FindAsync(item.Id);

            Assert.NotNull(updated);
            Assert.Equal(5, updated!.WantedQuantity);
            Assert.Equal("High", updated.Priority);
            Assert.Equal("New Reason", updated.ReasonWanted);
            Assert.True(updated.WantRaw);
            Assert.True(updated.WantGraded);
            Assert.Equal("BGS", updated.PreferredGradingCompany);
            Assert.True(updated.IsOpenToTrade);
            Assert.Equal("updated notes", updated.Notes);
        }

        [Fact]
        public async Task UpdateWishListItem_WhenOwnedByDifferentUser_ReturnsNotFound()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var owner = CreateTestUser();
            var otherUser = CreateTestUser();

            var card = new Card { Name = "Protected Wish Card" };

            context.Users.AddRange(owner, otherUser);
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var item = new WishListItem
            {
                UserId = owner.Id,
                CardId = card.Id,
                WantedQuantity = 1,
                Priority = "Low"
            };

            context.WishList.Add(item);
            await context.SaveChangesAsync();

            var controller = CreateController(context, otherUser.Id);

            var request = new UpdateWishListItemRequest
            {
                WantedQuantity = 99,
                Priority = "Hacked",
                ReasonWanted = "Should not update"
            };

            // Act
            var result = await controller.UpdateWishListItem(item.Id, request);

            // Assert
            Assert.IsType<NotFoundResult>(result);

            var unchanged = await context.WishList.FindAsync(item.Id);

            Assert.NotNull(unchanged);
            Assert.Equal(1, unchanged!.WantedQuantity);
            Assert.Equal("Low", unchanged.Priority);
        }

        [Fact]
        public async Task UpdateWishListItem_WhenNotExists_ReturnsNotFound()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var controller = CreateController(context, user.Id);

            var request = new UpdateWishListItemRequest
            {
                WantedQuantity = 2
            };

            // Act
            var result = await controller.UpdateWishListItem(999, request);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task DeleteWishListItem_WhenExistsForLoggedInUser_RemovesItem()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();
            var card = new Card { Name = "Delete Card" };

            context.Users.Add(user);
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var item = new WishListItem
            {
                UserId = user.Id,
                CardId = card.Id,
                WantedQuantity = 1
            };

            context.WishList.Add(item);
            await context.SaveChangesAsync();

            var controller = CreateController(context, user.Id);

            // Act
            var result = await controller.DeleteWishListItem(item.Id);

            // Assert
            Assert.IsType<NoContentResult>(result);

            var deleted = await context.WishList.FindAsync(item.Id);

            Assert.Null(deleted);
        }

        [Fact]
        public async Task DeleteWishListItem_WhenOwnedByDifferentUser_ReturnsNotFound()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var owner = CreateTestUser();
            var otherUser = CreateTestUser();

            var card = new Card { Name = "Protected Delete Wish Card" };

            context.Users.AddRange(owner, otherUser);
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var item = new WishListItem
            {
                UserId = owner.Id,
                CardId = card.Id,
                WantedQuantity = 1
            };

            context.WishList.Add(item);
            await context.SaveChangesAsync();

            var controller = CreateController(context, otherUser.Id);

            // Act
            var result = await controller.DeleteWishListItem(item.Id);

            // Assert
            Assert.IsType<NotFoundResult>(result);

            var stillExists = await context.WishList.FindAsync(item.Id);

            Assert.NotNull(stillExists);
        }

        [Fact]
        public async Task DeleteWishListItem_WhenNotExists_ReturnsNotFound()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var controller = CreateController(context, user.Id);

            // Act
            var result = await controller.DeleteWishListItem(999);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}