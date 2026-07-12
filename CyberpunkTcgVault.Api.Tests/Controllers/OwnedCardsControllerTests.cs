using CyberpunkTcgVault.Api.Controllers;
using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Tests.TestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;

namespace CyberpunkTcgVault.Api.Tests.Controllers
{
    public class OwnedCardsControllerTests
    {
        private static OwnedCardsController CreateOwnedCardsController(AppDbContext context)
        {
            return new OwnedCardsController(context, NullLogger<OwnedCardsController>.Instance);
        }

        [Fact]
        public async Task GetOwnedCards_WhenOwnedCardsExist_ReturnOkWithOwnedCards()
        {
            // Arrange
            var context = TestDbContextFactory.Create();

            var card = new Card { Name = "Test Card" };
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var ownedCard = new OwnedCard
            {
                CardId = card.Id,
                QuantityOwned = 1,
                Condition = "Near Mint"
            };

            context.OwnedCards.Add(ownedCard);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(context);

            // Act
            var result = await controller.GetOwnedCards();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var items = Assert.IsAssignableFrom<IEnumerable<OwnedCard>>(okResult.Value);
            Assert.Contains(items, oc => oc.CardId == card.Id);
        }

        [Fact]
        public async Task GetOwnedCardById_WhenExists_ReturnsOk()
        {
            var context = TestDbContextFactory.Create();
            var card = new Card { Name = "Card For Owned" };
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var owned = new OwnedCard { CardId = card.Id, QuantityOwned = 2 };
            context.OwnedCards.Add(owned);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(context);

            var result = await controller.GetOwnedCardById(owned.Id);

            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returned = Assert.IsType<OwnedCard>(okResult.Value);
            Assert.Equal(owned.Id, returned.Id);
            Assert.Equal(card.Id, returned.CardId);
        }

        [Fact]
        public async Task CreateOwnedCard_WhenCardExists_CreatesOwnedCard()
        {
            var context = TestDbContextFactory.Create();
            var card = new Card { Name = "Card For Create" };
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(context);

            var request = new CreateOwnedCardRequest
            {
                CardId = card.Id,
                QuantityOwned = 3,
                Condition = "   NM   ",
                IsOpenForTrade = true,
                Notes = "Some notes"
            };

            var result = await controller.CreateOwnedCard(request);

            var created = Assert.IsType<CreatedAtActionResult>(result.Result);
            var createdOwned = Assert.IsType<OwnedCard>(created.Value);

            Assert.Equal(card.Id, createdOwned.CardId);
            Assert.Equal(3, createdOwned.QuantityOwned);
            Assert.Equal("NM", createdOwned.Condition);
            Assert.Contains(context.OwnedCards, oc => oc.Id == createdOwned.Id);
        }

        [Fact]
        public async Task CreateOwnedCard_WhenCardDoesNotExist_ReturnsBadRequest()
        {
            var context = TestDbContextFactory.Create();

            var controller = CreateOwnedCardsController(context);

            var request = new CreateOwnedCardRequest
            {
                CardId = 999,
                QuantityOwned = 1
            };

            var result = await controller.CreateOwnedCard(request);

            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public async Task UpdateOwnedCard_WhenExists_UpdatesOwnedCard()
        {
            var context = TestDbContextFactory.Create();
            var card = new Card { Name = "Card For Update" };
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var owned = new OwnedCard { CardId = card.Id, QuantityOwned = 1, Condition = "Poor" };
            context.OwnedCards.Add(owned);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(context);

            var request = new UpdateOwnedCardRequest
            {
                QuantityOwned = 5,
                Condition = "   Mint   ",
                IsOpenForTrade = true
            };

            var result = await controller.UpdateOwnedCard(owned.Id, request);

            Assert.IsType<NoContentResult>(result);

            var updated = await context.OwnedCards.FindAsync(owned.Id);
            Assert.Equal(5, updated.QuantityOwned);
            Assert.Equal("Mint", updated.Condition);
            Assert.True(updated.IsOpenForTrade);
        }

        [Fact]
        public async Task UpdateOwnedCard_WhenNotExists_ReturnsNotFound()
        {
            var context = TestDbContextFactory.Create();
            var controller = CreateOwnedCardsController(context);

            var request = new UpdateOwnedCardRequest { QuantityOwned = 2 };

            var result = await controller.UpdateOwnedCard(999, request);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task DeleteOwnedCard_WhenExists_RemovesOwnedCard()
        {
            var context = TestDbContextFactory.Create();
            var card = new Card { Name = "Card For Delete" };
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var owned = new OwnedCard { CardId = card.Id, QuantityOwned = 1 };
            context.OwnedCards.Add(owned);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(context);

            var result = await controller.DeleteOwnedCard(owned.Id);

            Assert.IsType<NoContentResult>(result);
            var deleted = await context.OwnedCards.FindAsync(owned.Id);
            Assert.Null(deleted);
        }

        [Fact]
        public async Task DeleteOwnedCard_WhenNotExists_ReturnsNotFound()
        {
            var context = TestDbContextFactory.Create();
            var controller = CreateOwnedCardsController(context);

            var result = await controller.DeleteOwnedCard(999);

            Assert.IsType<NotFoundResult>(result);
        }
    }
}