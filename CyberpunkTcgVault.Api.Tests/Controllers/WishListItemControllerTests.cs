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
    public class WishListItemControllerTests
    {
        private static WishListItemController CreateController(
            AppDbContext context,
            Guid userId)
        {
            var wishListItemService = new WishListItemService(
                context,
                NullLogger<WishListItemService>.Instance);

            var currentUserService =
                new TestCurrentUserService(userId);

            return new WishListItemController(
                wishListItemService,
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

        private static async Task<CardPrinting> CreateTestCardPrinting(
            AppDbContext context,
            string cardName)
        {
            var printing = new CardPrinting
            {
                Card = new Card
                {
                    Name = cardName
                },
                CardSet = new CardSet
                {
                    Name = "Test Set",
                    Code = "TEST"
                },
                CardNumber = "TEST-001",
                Rarity = "Rare",
                LanguageCode = "en"
            };

            context.CardPrintings.Add(printing);
            await context.SaveChangesAsync();

            return printing;
        }

        [Fact]
        public async Task GetWishListItems_WhenItemsExist_ReturnsOkWithItemResponses()
        {
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var cardPrinting = await CreateTestCardPrinting(
                context,
                "Wish Card");

            var item = new WishListItem
            {
                UserId = user.Id,
                CardPrintingId = cardPrinting.Id,
                WantedQuantity = 2,
                Priority = "High"
            };

            context.WishList.Add(item);
            await context.SaveChangesAsync();

            var controller = CreateController(
                context,
                user.Id);

            var result = await controller.GetWishListItems(
                CancellationToken.None);

            var ok =
                Assert.IsType<OkObjectResult>(result.Result);

            var items =
                Assert.IsAssignableFrom<IEnumerable<WishListItemResponse>>(
                    ok.Value);

            Assert.Contains(
                items,
                response =>
                    response.CardPrintingId == cardPrinting.Id &&
                    response.CardId == cardPrinting.CardId &&
                    response.WantedQuantity == 2);
        }

        [Fact]
        public async Task GetWishListItems_WhenOtherUsersHaveItems_DoesNotReturnOtherUsersItems()
        {
            using var context = TestDbContextFactory.Create();

            var userOne = CreateTestUser();
            var userTwo = CreateTestUser();

            context.Users.AddRange(userOne, userTwo);
            await context.SaveChangesAsync();

            var cardPrinting = await CreateTestCardPrinting(
                context,
                "Shared Wish Card");

            var userOneItem = new WishListItem
            {
                UserId = userOne.Id,
                CardPrintingId = cardPrinting.Id,
                WantedQuantity = 1
            };

            var userTwoItem = new WishListItem
            {
                UserId = userTwo.Id,
                CardPrintingId = cardPrinting.Id,
                WantedQuantity = 5
            };

            context.WishList.AddRange(
                userOneItem,
                userTwoItem);

            await context.SaveChangesAsync();

            var controller = CreateController(
                context,
                userOne.Id);

            var result = await controller.GetWishListItems(
                CancellationToken.None);

            var ok =
                Assert.IsType<OkObjectResult>(result.Result);

            var items =
                Assert.IsAssignableFrom<IEnumerable<WishListItemResponse>>(
                    ok.Value);

            Assert.Contains(
                items,
                response => response.Id == userOneItem.Id);

            Assert.DoesNotContain(
                items,
                response => response.Id == userTwoItem.Id);
        }

        [Fact]
        public async Task GetWishListItemById_WhenExistsForLoggedInUser_ReturnsOk()
        {
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var cardPrinting = await CreateTestCardPrinting(
                context,
                "ById Card");

            var item = new WishListItem
            {
                UserId = user.Id,
                CardPrintingId = cardPrinting.Id,
                WantedQuantity = 1
            };

            context.WishList.Add(item);
            await context.SaveChangesAsync();

            var controller = CreateController(
                context,
                user.Id);

            var result = await controller.GetWishListItemById(
                item.Id,
                CancellationToken.None);

            var ok =
                Assert.IsType<OkObjectResult>(result.Result);

            var returned =
                Assert.IsType<WishListItemResponse>(ok.Value);

            Assert.Equal(item.Id, returned.Id);
            Assert.Equal(cardPrinting.Id, returned.CardPrintingId);
            Assert.Equal(cardPrinting.CardId, returned.CardId);
            Assert.Equal("ById Card", returned.CardName);
        }

        [Fact]
        public async Task GetWishListItemById_WhenOwnedByDifferentUser_ReturnsNotFound()
        {
            using var context = TestDbContextFactory.Create();

            var owner = CreateTestUser();
            var otherUser = CreateTestUser();

            context.Users.AddRange(owner, otherUser);
            await context.SaveChangesAsync();

            var cardPrinting = await CreateTestCardPrinting(
                context,
                "Private Wish Card");

            var item = new WishListItem
            {
                UserId = owner.Id,
                CardPrintingId = cardPrinting.Id,
                WantedQuantity = 1
            };

            context.WishList.Add(item);
            await context.SaveChangesAsync();

            var controller = CreateController(
                context,
                otherUser.Id);

            var result = await controller.GetWishListItemById(
                item.Id,
                CancellationToken.None);

            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task CreateWishListItem_WhenCardPrintingExists_CreatesItemForLoggedInUser()
        {
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var cardPrinting = await CreateTestCardPrinting(
                context,
                "Create Card");

            var controller = CreateController(
                context,
                user.Id);

            var request = new CreateWishListItemRequest
            {
                CardPrintingId = cardPrinting.Id,
                WantedQuantity = 3,
                Priority = "   Urgent   ",
                ReasonWanted = "   Complete Set   ",
                WantRaw = true,
                WantGraded = false,
                PreferredGradingCompany = "  PSA  ",
                IsOpenToTrade = true,
                Notes = "  contact me  "
            };

            var result = await controller.CreateWishListItem(
                request,
                CancellationToken.None);

            var created =
                Assert.IsType<CreatedAtActionResult>(result.Result);

            var response =
                Assert.IsType<WishListItemResponse>(created.Value);

            Assert.Equal(cardPrinting.Id, response.CardPrintingId);
            Assert.Equal(cardPrinting.CardId, response.CardId);
            Assert.Equal("Create Card", response.CardName);
            Assert.Equal(3, response.WantedQuantity);
            Assert.Equal("Urgent", response.Priority);
            Assert.Equal("Complete Set", response.ReasonWanted);
            Assert.True(response.WantRaw);
            Assert.False(response.WantGraded);
            Assert.Equal(
                "PSA",
                response.PreferredGradingCompany);
            Assert.True(response.IsOpenToTrade);
            Assert.Equal("contact me", response.Notes);

            var savedItem =
                Assert.Single(context.WishList);

            Assert.Equal(user.Id, savedItem.UserId);
            Assert.Equal(
                cardPrinting.Id,
                savedItem.CardPrintingId);
            Assert.Equal(3, savedItem.WantedQuantity);
            Assert.Equal("Urgent", savedItem.Priority);
        }

        [Fact]
        public async Task CreateWishListItem_WhenCardPrintingDoesNotExist_ReturnsBadRequest()
        {
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var controller = CreateController(
                context,
                user.Id);

            var request = new CreateWishListItemRequest
            {
                CardPrintingId = 999,
                WantedQuantity = 1
            };

            var result = await controller.CreateWishListItem(
                request,
                CancellationToken.None);

            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public async Task UpdateWishListItem_WhenExistsForLoggedInUser_UpdatesItem()
        {
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var cardPrinting = await CreateTestCardPrinting(
                context,
                "Update Card");

            var item = new WishListItem
            {
                UserId = user.Id,
                CardPrintingId = cardPrinting.Id,
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

            var controller = CreateController(
                context,
                user.Id);

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

            var result = await controller.UpdateWishListItem(
                item.Id,
                request,
                CancellationToken.None);

            Assert.IsType<NoContentResult>(result);

            var updated =
                await context.WishList.FindAsync(item.Id);

            Assert.NotNull(updated);
            Assert.Equal(5, updated!.WantedQuantity);
            Assert.Equal("High", updated.Priority);
            Assert.Equal("New Reason", updated.ReasonWanted);
            Assert.True(updated.WantRaw);
            Assert.True(updated.WantGraded);
            Assert.Equal(
                "BGS",
                updated.PreferredGradingCompany);
            Assert.True(updated.IsOpenToTrade);
            Assert.Equal("updated notes", updated.Notes);
        }

        [Fact]
        public async Task UpdateWishListItem_WhenOwnedByDifferentUser_ReturnsNotFound()
        {
            using var context = TestDbContextFactory.Create();

            var owner = CreateTestUser();
            var otherUser = CreateTestUser();

            context.Users.AddRange(owner, otherUser);
            await context.SaveChangesAsync();

            var cardPrinting = await CreateTestCardPrinting(
                context,
                "Protected Wish Card");

            var item = new WishListItem
            {
                UserId = owner.Id,
                CardPrintingId = cardPrinting.Id,
                WantedQuantity = 1,
                Priority = "Low"
            };

            context.WishList.Add(item);
            await context.SaveChangesAsync();

            var controller = CreateController(
                context,
                otherUser.Id);

            var request = new UpdateWishListItemRequest
            {
                WantedQuantity = 99,
                Priority = "Hacked",
                ReasonWanted = "Should not update"
            };

            var result = await controller.UpdateWishListItem(
                item.Id,
                request,
                CancellationToken.None);

            Assert.IsType<NotFoundResult>(result);

            var unchanged =
                await context.WishList.FindAsync(item.Id);

            Assert.NotNull(unchanged);
            Assert.Equal(1, unchanged!.WantedQuantity);
            Assert.Equal("Low", unchanged.Priority);
        }

        [Fact]
        public async Task UpdateWishListItem_WhenNotExists_ReturnsNotFound()
        {
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var controller = CreateController(
                context,
                user.Id);

            var request = new UpdateWishListItemRequest
            {
                WantedQuantity = 2
            };

            var result = await controller.UpdateWishListItem(
                999,
                request,
                CancellationToken.None);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task DeleteWishListItem_WhenExistsForLoggedInUser_RemovesItem()
        {
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var cardPrinting = await CreateTestCardPrinting(
                context,
                "Delete Card");

            var item = new WishListItem
            {
                UserId = user.Id,
                CardPrintingId = cardPrinting.Id,
                WantedQuantity = 1
            };

            context.WishList.Add(item);
            await context.SaveChangesAsync();

            var controller = CreateController(
                context,
                user.Id);

            var result = await controller.DeleteWishListItem(
                item.Id,
                CancellationToken.None);

            Assert.IsType<NoContentResult>(result);

            var deleted =
                await context.WishList.FindAsync(item.Id);

            Assert.Null(deleted);
        }

        [Fact]
        public async Task DeleteWishListItem_WhenOwnedByDifferentUser_ReturnsNotFound()
        {
            using var context = TestDbContextFactory.Create();

            var owner = CreateTestUser();
            var otherUser = CreateTestUser();

            context.Users.AddRange(owner, otherUser);
            await context.SaveChangesAsync();

            var cardPrinting = await CreateTestCardPrinting(
                context,
                "Protected Delete Wish Card");

            var item = new WishListItem
            {
                UserId = owner.Id,
                CardPrintingId = cardPrinting.Id,
                WantedQuantity = 1
            };

            context.WishList.Add(item);
            await context.SaveChangesAsync();

            var controller = CreateController(
                context,
                otherUser.Id);

            var result = await controller.DeleteWishListItem(
                item.Id,
                CancellationToken.None);

            Assert.IsType<NotFoundResult>(result);

            var stillExists =
                await context.WishList.FindAsync(item.Id);

            Assert.NotNull(stillExists);
        }

        [Fact]
        public async Task DeleteWishListItem_WhenNotExists_ReturnsNotFound()
        {
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var controller = CreateController(
                context,
                user.Id);

            var result = await controller.DeleteWishListItem(
                999,
                CancellationToken.None);

            Assert.IsType<NotFoundResult>(result);
        }
    }
}
