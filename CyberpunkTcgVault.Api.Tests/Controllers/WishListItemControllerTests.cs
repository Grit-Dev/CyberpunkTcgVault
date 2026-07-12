using CyberpunkTcgVault.Api.Controllers;
using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Tests.TestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;

namespace CyberpunkTcgVault.Api.Tests.Controllers
{
    public class WishListItemControllerTests
    {
        private static WishListItemController CreateController(AppDbContext context)
        {
            return new WishListItemController(context, NullLogger<WishListItemController>.Instance);
        }

        [Fact]
        public async Task GetWishListItems_WhenItemsExist_ReturnsOkWithItems()
        {
            var context = TestDbContextFactory.Create();

            var card = new Card { Name = "Wish Card" };
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var item = new WishListItem
            {
                CardId = card.Id,
                WantedQuantity = 2,
                Priority = "High"
            };
            context.WishList.Add(item);
            await context.SaveChangesAsync();

            var controller = CreateController(context);

            var result = await controller.GetWishListItems();

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var items = Assert.IsAssignableFrom<IEnumerable<WishListItem>>(ok.Value);
            Assert.Contains(items, i => i.CardId == card.Id && i.WantedQuantity == 2);
        }

        [Fact]
        public async Task GetWishListItemById_WhenExists_ReturnsOk()
        {
            var context = TestDbContextFactory.Create();

            var card = new Card { Name = "ById Card" };
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var item = new WishListItem { CardId = card.Id, WantedQuantity = 1 };
            context.WishList.Add(item);
            await context.SaveChangesAsync();

            var controller = CreateController(context);

            var result = await controller.GetWishListItemById(item.Id);

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var returned = Assert.IsType<WishListItem>(ok.Value);
            Assert.Equal(item.Id, returned.Id);
            Assert.Equal(card.Id, returned.CardId);
        }

        [Fact]
        public async Task CreateWishListItem_WhenCardExists_CreatesItem()
        {
            var context = TestDbContextFactory.Create();

            var card = new Card { Name = "Create Card" };
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var controller = CreateController(context);

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

            var result = await controller.CreateWishListItem(request);

            var created = Assert.IsType<CreatedAtActionResult>(result.Result);
            var createdItem = Assert.IsType<WishListItem>(created.Value);

            Assert.Equal(card.Id, createdItem.CardId);
            Assert.Equal(3, createdItem.WantedQuantity);
            Assert.Equal("Urgent", createdItem.Priority);
            Assert.Equal("Complete Set", createdItem.ReasonWanted);
            Assert.True(createdItem.WantRaw);
            Assert.False(createdItem.WantGraded);
            Assert.Equal("PSA", createdItem.PreferredGradingCompany);
            Assert.True(createdItem.IsOpenToTrade);
            Assert.Equal("contact me", createdItem.Notes);
            Assert.Contains(context.WishList, w => w.Id == createdItem.Id);
        }

        [Fact]
        public async Task CreateWishListItem_WhenCardDoesNotExist_ReturnsBadRequest()
        {
            var context = TestDbContextFactory.Create();
            var controller = CreateController(context);

            var request = new CreateWishListItemRequest
            {
                CardId = 999,
                WantedQuantity = 1
            };

            var result = await controller.CreateWishListItem(request);

            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public async Task UpdateWishListItem_WhenExists_UpdatesItem()
        {
            var context = TestDbContextFactory.Create();

            var card = new Card { Name = "Update Card" };
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var item = new WishListItem
            {
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

            var controller = CreateController(context);

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

            var result = await controller.UpdateWishListItem(item.Id, request);

            Assert.IsType<NoContentResult>(result);

            var updated = await context.WishList.FindAsync(item.Id);
            Assert.Equal(5, updated.WantedQuantity);
            Assert.Equal("High", updated.Priority);
            Assert.Equal("New Reason", updated.ReasonWanted);
            Assert.True(updated.WantRaw);
            Assert.True(updated.WantGraded);
            Assert.Equal("BGS", updated.PreferredGradingCompany);
            Assert.True(updated.IsOpenToTrade);
            Assert.Equal("updated notes", updated.Notes);
        }

        [Fact]
        public async Task UpdateWishListItem_WhenNotExists_ReturnsNotFound()
        {
            var context = TestDbContextFactory.Create();
            var controller = CreateController(context);

            var request = new UpdateWishListItemRequest { WantedQuantity = 2 };

            var result = await controller.UpdateWishListItem(999, request);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task DeleteWishListItem_WhenExists_RemovesItem()
        {
            var context = TestDbContextFactory.Create();

            var card = new Card { Name = "Delete Card" };
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var item = new WishListItem { CardId = card.Id, WantedQuantity = 1 };
            context.WishList.Add(item);
            await context.SaveChangesAsync();

            var controller = CreateController(context);

            var result = await controller.DeleteWishListItem(item.Id);

            Assert.IsType<NoContentResult>(result);
            var deleted = await context.WishList.FindAsync(item.Id);
            Assert.Null(deleted);
        }

        [Fact]
        public async Task DeleteWishListItem_WhenNotExists_ReturnsNotFound()
        {
            var context = TestDbContextFactory.Create();
            var controller = CreateController(context);

            var result = await controller.DeleteWishListItem(999);

            Assert.IsType<NotFoundResult>(result);
        }
    }
}