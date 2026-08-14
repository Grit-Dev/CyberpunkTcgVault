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
    public class OwnedCardsControllerTests
    {
        private static OwnedCardsController CreateOwnedCardsController(
            AppDbContext context,
            Guid userId)
        {
            var ownedCardService = new OwnedCardService(
                context,
                NullLogger<OwnedCardService>.Instance);

            var currentUserService =
                new TestCurrentUserService(userId);

            return new OwnedCardsController(
                ownedCardService,
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
        public async Task GetOwnedCards_WhenOwnedCardsExist_ReturnsOkWithOwnedCardResponses()
        {
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var cardPrinting = await CreateTestCardPrinting(
                context,
                "Test Card");

            var ownedCard = new OwnedCard
            {
                UserId = user.Id,
                CardPrintingId = cardPrinting.Id,
                QuantityOwned = 1,
                Condition = "Near Mint"
            };

            context.OwnedCards.Add(ownedCard);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(
                context,
                user.Id);

            var result = await controller.GetOwnedCards(
                CancellationToken.None);

            var okResult =
                Assert.IsType<OkObjectResult>(result.Result);

            var items =
                Assert.IsAssignableFrom<IEnumerable<OwnedCardResponse>>(
                    okResult.Value);

            Assert.Contains(
                items,
                response =>
                    response.CardPrintingId == cardPrinting.Id &&
                    response.CardId == cardPrinting.CardId);
        }

        [Fact]
        public async Task GetOwnedCards_WhenOtherUsersHaveCards_DoesNotReturnOtherUsersCards()
        {
            using var context = TestDbContextFactory.Create();

            var userOne = CreateTestUser();
            var userTwo = CreateTestUser();

            context.Users.AddRange(userOne, userTwo);
            await context.SaveChangesAsync();

            var cardPrinting = await CreateTestCardPrinting(
                context,
                "Shared Card");

            var userOneOwnedCard = new OwnedCard
            {
                UserId = userOne.Id,
                CardPrintingId = cardPrinting.Id,
                QuantityOwned = 1
            };

            var userTwoOwnedCard = new OwnedCard
            {
                UserId = userTwo.Id,
                CardPrintingId = cardPrinting.Id,
                QuantityOwned = 5
            };

            context.OwnedCards.AddRange(
                userOneOwnedCard,
                userTwoOwnedCard);

            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(
                context,
                userOne.Id);

            var result = await controller.GetOwnedCards(
                CancellationToken.None);

            var okResult =
                Assert.IsType<OkObjectResult>(result.Result);

            var items =
                Assert.IsAssignableFrom<IEnumerable<OwnedCardResponse>>(
                    okResult.Value);

            Assert.Contains(
                items,
                response => response.Id == userOneOwnedCard.Id);

            Assert.DoesNotContain(
                items,
                response => response.Id == userTwoOwnedCard.Id);
        }

        [Fact]
        public async Task GetOwnedCardById_WhenExistsForLoggedInUser_ReturnsOk()
        {
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var cardPrinting = await CreateTestCardPrinting(
                context,
                "Card For Owned");

            var owned = new OwnedCard
            {
                UserId = user.Id,
                CardPrintingId = cardPrinting.Id,
                QuantityOwned = 2
            };

            context.OwnedCards.Add(owned);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(
                context,
                user.Id);

            var result = await controller.GetOwnedCardById(
                owned.Id,
                CancellationToken.None);

            var okResult =
                Assert.IsType<OkObjectResult>(result.Result);

            var returned =
                Assert.IsType<OwnedCardResponse>(okResult.Value);

            Assert.Equal(owned.Id, returned.Id);
            Assert.Equal(cardPrinting.Id, returned.CardPrintingId);
            Assert.Equal(cardPrinting.CardId, returned.CardId);
            Assert.Equal("Card For Owned", returned.CardName);
        }

        [Fact]
        public async Task GetOwnedCardById_WhenOwnedByDifferentUser_ReturnsNotFound()
        {
            using var context = TestDbContextFactory.Create();

            var owner = CreateTestUser();
            var otherUser = CreateTestUser();

            context.Users.AddRange(owner, otherUser);
            await context.SaveChangesAsync();

            var cardPrinting = await CreateTestCardPrinting(
                context,
                "Private Card");

            var owned = new OwnedCard
            {
                UserId = owner.Id,
                CardPrintingId = cardPrinting.Id,
                QuantityOwned = 1
            };

            context.OwnedCards.Add(owned);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(
                context,
                otherUser.Id);

            var result = await controller.GetOwnedCardById(
                owned.Id,
                CancellationToken.None);

            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task CreateOwnedCard_WhenCardPrintingExists_CreatesOwnedCardForLoggedInUser()
        {
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var cardPrinting = await CreateTestCardPrinting(
                context,
                "Card For Create");

            var controller = CreateOwnedCardsController(
                context,
                user.Id);

            var request = new CreateOwnedCardRequest
            {
                CardPrintingId = cardPrinting.Id,
                QuantityOwned = 3,
                Condition = "   NM   ",
                IsOpenForTrade = true,
                Notes = "Some notes"
            };

            var result = await controller.CreateOwnedCard(
                request,
                CancellationToken.None);

            var created =
                Assert.IsType<CreatedAtActionResult>(result.Result);

            var response =
                Assert.IsType<OwnedCardResponse>(created.Value);

            Assert.Equal(cardPrinting.Id, response.CardPrintingId);
            Assert.Equal(cardPrinting.CardId, response.CardId);
            Assert.Equal("Card For Create", response.CardName);
            Assert.Equal(3, response.QuantityOwned);
            Assert.Equal("NM", response.Condition);

            var savedOwnedCard =
                Assert.Single(context.OwnedCards);

            Assert.Equal(user.Id, savedOwnedCard.UserId);
            Assert.Equal(
                cardPrinting.Id,
                savedOwnedCard.CardPrintingId);
            Assert.Equal(3, savedOwnedCard.QuantityOwned);
            Assert.Equal("NM", savedOwnedCard.Condition);
        }

        [Fact]
        public async Task CreateOwnedCard_WhenCardPrintingDoesNotExist_ReturnsBadRequest()
        {
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(
                context,
                user.Id);

            var request = new CreateOwnedCardRequest
            {
                CardPrintingId = 999,
                QuantityOwned = 1
            };

            var result = await controller.CreateOwnedCard(
                request,
                CancellationToken.None);

            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public async Task UpdateOwnedCard_WhenExistsForLoggedInUser_UpdatesOwnedCard()
        {
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var cardPrinting = await CreateTestCardPrinting(
                context,
                "Card For Update");

            var owned = new OwnedCard
            {
                UserId = user.Id,
                CardPrintingId = cardPrinting.Id,
                QuantityOwned = 1,
                Condition = "Poor"
            };

            context.OwnedCards.Add(owned);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(
                context,
                user.Id);

            var request = new UpdateOwnedCardRequest
            {
                QuantityOwned = 5,
                Condition = "   Mint   ",
                IsOpenForTrade = true
            };

            var result = await controller.UpdateOwnedCard(
                owned.Id,
                request,
                CancellationToken.None);

            Assert.IsType<NoContentResult>(result);

            var updated =
                await context.OwnedCards.FindAsync(owned.Id);

            Assert.NotNull(updated);
            Assert.Equal(5, updated!.QuantityOwned);
            Assert.Equal("Mint", updated.Condition);
            Assert.True(updated.IsOpenForTrade);
        }

        [Fact]
        public async Task UpdateOwnedCard_WhenOwnedByDifferentUser_ReturnsNotFound()
        {
            using var context = TestDbContextFactory.Create();

            var owner = CreateTestUser();
            var otherUser = CreateTestUser();

            context.Users.AddRange(owner, otherUser);
            await context.SaveChangesAsync();

            var cardPrinting = await CreateTestCardPrinting(
                context,
                "Protected Card");

            var owned = new OwnedCard
            {
                UserId = owner.Id,
                CardPrintingId = cardPrinting.Id,
                QuantityOwned = 1,
                Condition = "Poor"
            };

            context.OwnedCards.Add(owned);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(
                context,
                otherUser.Id);

            var request = new UpdateOwnedCardRequest
            {
                QuantityOwned = 99,
                Condition = "Hacked"
            };

            var result = await controller.UpdateOwnedCard(
                owned.Id,
                request,
                CancellationToken.None);

            Assert.IsType<NotFoundResult>(result);

            var unchanged =
                await context.OwnedCards.FindAsync(owned.Id);

            Assert.NotNull(unchanged);
            Assert.Equal(1, unchanged!.QuantityOwned);
            Assert.Equal("Poor", unchanged.Condition);
        }

        [Fact]
        public async Task UpdateOwnedCard_WhenNotExists_ReturnsNotFound()
        {
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(
                context,
                user.Id);

            var request = new UpdateOwnedCardRequest
            {
                QuantityOwned = 2
            };

            var result = await controller.UpdateOwnedCard(
                999,
                request,
                CancellationToken.None);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task DeleteOwnedCard_WhenExistsForLoggedInUser_RemovesOwnedCard()
        {
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var cardPrinting = await CreateTestCardPrinting(
                context,
                "Card For Delete");

            var owned = new OwnedCard
            {
                UserId = user.Id,
                CardPrintingId = cardPrinting.Id,
                QuantityOwned = 1
            };

            context.OwnedCards.Add(owned);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(
                context,
                user.Id);

            var result = await controller.DeleteOwnedCard(
                owned.Id,
                CancellationToken.None);

            Assert.IsType<NoContentResult>(result);

            var deleted =
                await context.OwnedCards.FindAsync(owned.Id);

            Assert.Null(deleted);
        }

        [Fact]
        public async Task DeleteOwnedCard_WhenOwnedByDifferentUser_ReturnsNotFound()
        {
            using var context = TestDbContextFactory.Create();

            var owner = CreateTestUser();
            var otherUser = CreateTestUser();

            context.Users.AddRange(owner, otherUser);
            await context.SaveChangesAsync();

            var cardPrinting = await CreateTestCardPrinting(
                context,
                "Protected Delete Card");

            var owned = new OwnedCard
            {
                UserId = owner.Id,
                CardPrintingId = cardPrinting.Id,
                QuantityOwned = 1
            };

            context.OwnedCards.Add(owned);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(
                context,
                otherUser.Id);

            var result = await controller.DeleteOwnedCard(
                owned.Id,
                CancellationToken.None);

            Assert.IsType<NotFoundResult>(result);

            var stillExists =
                await context.OwnedCards.FindAsync(owned.Id);

            Assert.NotNull(stillExists);
        }

        [Fact]
        public async Task DeleteOwnedCard_WhenNotExists_ReturnsNotFound()
        {
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var controller = CreateOwnedCardsController(
                context,
                user.Id);

            var result = await controller.DeleteOwnedCard(
                999,
                CancellationToken.None);

            Assert.IsType<NotFoundResult>(result);
        }
    }
}
