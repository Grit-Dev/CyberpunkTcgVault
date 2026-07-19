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
    public class OwnedCardsControllerTests
    {
        private static OwnedCardsController CreateOwnedCardsController(AppDbContext context, Guid userId)
        {
            var controller = new OwnedCardsController(context, NullLogger<OwnedCardsController>.Instance);

            controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = new ClaimsPrincipal(new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, userId.ToString())
                    }, "TestAuth"))
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
        public async Task GetOwnedCards_WhenOwnedCardsExist_ReturnsOkWithOwnedCardResponses()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            var card = new Card { Name = "Test Card" };

            context.Users.Add(user);
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var ownedCard = new OwnedCard
            {
                UserId = user.Id,
                CardId = card.Id,
                QuantityOwned = 1,
                Condition = "Near Mint"
            };

            context.OwnedCards.Add(ownedCard);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(context, user.Id);

            // Act
            var result = await controller.GetOwnedCards();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var items = Assert.IsAssignableFrom<IEnumerable<OwnedCardResponse>>(okResult.Value);

            Assert.Contains(items, ownedCardResponse => ownedCardResponse.CardId == card.Id);
        }

        [Fact]
        public async Task GetOwnedCards_WhenOtherUsersHaveCards_DoesNotReturnOtherUsersCards()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var userOne = CreateTestUser();
            var userTwo = CreateTestUser();

            var card = new Card { Name = "Shared Card" };

            context.Users.AddRange(userOne, userTwo);
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var userOneOwnedCard = new OwnedCard
            {
                UserId = userOne.Id,
                CardId = card.Id,
                QuantityOwned = 1
            };

            var userTwoOwnedCard = new OwnedCard
            {
                UserId = userTwo.Id,
                CardId = card.Id,
                QuantityOwned = 5
            };

            context.OwnedCards.AddRange(userOneOwnedCard, userTwoOwnedCard);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(context, userOne.Id);

            // Act
            var result = await controller.GetOwnedCards();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var items = Assert.IsAssignableFrom<IEnumerable<OwnedCardResponse>>(okResult.Value);

            Assert.Contains(items, ownedCardResponse => ownedCardResponse.Id == userOneOwnedCard.Id);
            Assert.DoesNotContain(items, ownedCardResponse => ownedCardResponse.Id == userTwoOwnedCard.Id);
        }

        [Fact]
        public async Task GetOwnedCardById_WhenExistsForLoggedInUser_ReturnsOk()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();
            var card = new Card { Name = "Card For Owned" };

            context.Users.Add(user);
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var owned = new OwnedCard
            {
                UserId = user.Id,
                CardId = card.Id,
                QuantityOwned = 2
            };

            context.OwnedCards.Add(owned);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(context, user.Id);

            // Act
            var result = await controller.GetOwnedCardById(owned.Id);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returned = Assert.IsType<OwnedCardResponse>(okResult.Value);

            Assert.Equal(owned.Id, returned.Id);
            Assert.Equal(card.Id, returned.CardId);
            Assert.Equal("Card For Owned", returned.CardName);
        }

        [Fact]
        public async Task GetOwnedCardById_WhenOwnedByDifferentUser_ReturnsNotFound()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var owner = CreateTestUser();
            var otherUser = CreateTestUser();

            var card = new Card { Name = "Private Card" };

            context.Users.AddRange(owner, otherUser);
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var owned = new OwnedCard
            {
                UserId = owner.Id,
                CardId = card.Id,
                QuantityOwned = 1
            };

            context.OwnedCards.Add(owned);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(context, otherUser.Id);

            // Act
            var result = await controller.GetOwnedCardById(owned.Id);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task CreateOwnedCard_WhenCardExists_CreatesOwnedCardForLoggedInUser()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();
            var card = new Card { Name = "Card For Create" };

            context.Users.Add(user);
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(context, user.Id);

            var request = new CreateOwnedCardRequest
            {
                CardId = card.Id,
                QuantityOwned = 3,
                Condition = "   NM   ",
                IsOpenForTrade = true,
                Notes = "Some notes"
            };

            // Act
            var result = await controller.CreateOwnedCard(request);

            // Assert
            var created = Assert.IsType<CreatedAtActionResult>(result.Result);
            var response = Assert.IsType<OwnedCardResponse>(created.Value);

            Assert.Equal(card.Id, response.CardId);
            Assert.Equal("Card For Create", response.CardName);
            Assert.Equal(3, response.QuantityOwned);
            Assert.Equal("NM", response.Condition);

            var savedOwnedCard = Assert.Single(context.OwnedCards);

            Assert.Equal(user.Id, savedOwnedCard.UserId);
            Assert.Equal(card.Id, savedOwnedCard.CardId);
            Assert.Equal(3, savedOwnedCard.QuantityOwned);
            Assert.Equal("NM", savedOwnedCard.Condition);
        }

        [Fact]
        public async Task CreateOwnedCard_WhenCardDoesNotExist_ReturnsBadRequest()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(context, user.Id);

            var request = new CreateOwnedCardRequest
            {
                CardId = 999,
                QuantityOwned = 1
            };

            // Act
            var result = await controller.CreateOwnedCard(request);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public async Task UpdateOwnedCard_WhenExistsForLoggedInUser_UpdatesOwnedCard()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();
            var card = new Card { Name = "Card For Update" };

            context.Users.Add(user);
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var owned = new OwnedCard
            {
                UserId = user.Id,
                CardId = card.Id,
                QuantityOwned = 1,
                Condition = "Poor"
            };

            context.OwnedCards.Add(owned);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(context, user.Id);

            var request = new UpdateOwnedCardRequest
            {
                QuantityOwned = 5,
                Condition = "   Mint   ",
                IsOpenForTrade = true
            };

            // Act
            var result = await controller.UpdateOwnedCard(owned.Id, request);

            // Assert
            Assert.IsType<NoContentResult>(result);

            var updated = await context.OwnedCards.FindAsync(owned.Id);

            Assert.NotNull(updated);
            Assert.Equal(5, updated!.QuantityOwned);
            Assert.Equal("Mint", updated.Condition);
            Assert.True(updated.IsOpenForTrade);
        }

        [Fact]
        public async Task UpdateOwnedCard_WhenOwnedByDifferentUser_ReturnsNotFound()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var owner = CreateTestUser();
            var otherUser = CreateTestUser();

            var card = new Card { Name = "Protected Card" };

            context.Users.AddRange(owner, otherUser);
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var owned = new OwnedCard
            {
                UserId = owner.Id,
                CardId = card.Id,
                QuantityOwned = 1,
                Condition = "Poor"
            };

            context.OwnedCards.Add(owned);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(context, otherUser.Id);

            var request = new UpdateOwnedCardRequest
            {
                QuantityOwned = 99,
                Condition = "Hacked"
            };

            // Act
            var result = await controller.UpdateOwnedCard(owned.Id, request);

            // Assert
            Assert.IsType<NotFoundResult>(result);

            var unchanged = await context.OwnedCards.FindAsync(owned.Id);

            Assert.NotNull(unchanged);
            Assert.Equal(1, unchanged!.QuantityOwned);
            Assert.Equal("Poor", unchanged.Condition);
        }

        [Fact]
        public async Task UpdateOwnedCard_WhenNotExists_ReturnsNotFound()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(context, user.Id);

            var request = new UpdateOwnedCardRequest
            {
                QuantityOwned = 2
            };

            // Act
            var result = await controller.UpdateOwnedCard(999, request);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task DeleteOwnedCard_WhenExistsForLoggedInUser_RemovesOwnedCard()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();
            var card = new Card { Name = "Card For Delete" };

            context.Users.Add(user);
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var owned = new OwnedCard
            {
                UserId = user.Id,
                CardId = card.Id,
                QuantityOwned = 1
            };

            context.OwnedCards.Add(owned);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(context, user.Id);

            // Act
            var result = await controller.DeleteOwnedCard(owned.Id);

            // Assert
            Assert.IsType<NoContentResult>(result);

            var deleted = await context.OwnedCards.FindAsync(owned.Id);

            Assert.Null(deleted);
        }

        [Fact]
        public async Task DeleteOwnedCard_WhenOwnedByDifferentUser_ReturnsNotFound()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var owner = CreateTestUser();
            var otherUser = CreateTestUser();

            var card = new Card { Name = "Protected Delete Card" };

            context.Users.AddRange(owner, otherUser);
            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var owned = new OwnedCard
            {
                UserId = owner.Id,
                CardId = card.Id,
                QuantityOwned = 1
            };

            context.OwnedCards.Add(owned);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(context, otherUser.Id);

            // Act
            var result = await controller.DeleteOwnedCard(owned.Id);

            // Assert
            Assert.IsType<NotFoundResult>(result);

            var stillExists = await context.OwnedCards.FindAsync(owned.Id);

            Assert.NotNull(stillExists);
        }

        [Fact]
        public async Task DeleteOwnedCard_WhenNotExists_ReturnsNotFound()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(context, user.Id);

            // Act
            var result = await controller.DeleteOwnedCard(999);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}