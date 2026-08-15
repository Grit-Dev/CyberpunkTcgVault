using CyberpunkTcgVault.Api.Controllers;
using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Tests.TestHelpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;
using CyberpunkTcgVault.Api.Services;

namespace CyberpunkTcgVault.Api.Tests.Controllers
{
    public class CardsControllerTests
    {
        private static CardsController CreateCardsController(
            AppDbContext context)
        {
            var cardService = new CardService(
                context,
                NullLogger<CardService>.Instance);

            return ControllerTestContext.Configure(
                new CardsController(cardService));
        }

        private static async Task<Card> CreateCardWithPrintingAsync(
            AppDbContext context,
            string name,
            string rarity = "Rare",
            string setName = "Beta",
            string cardNumber = "B-001")
        {
            var card = new Card
            {
                Name = name,
                Colour = "Red",
                CardType = "Legend",
                Classification = "Character"
            };

            var cardSet = new CardSet
            {
                Name = setName,
                Code = "TEST"
            };

            var printing = new CardPrinting
            {
                Card = card,
                CardSet = cardSet,
                CardNumber = cardNumber,
                Rarity = rarity,
                LanguageCode = "en"
            };

            context.CardPrintings.Add(printing);
            await context.SaveChangesAsync();

            return card;
        }

        [Fact]
        public async Task GetCards_WhenCardsExist_ReturnsOkWithCards()
        {
            using var context = TestDbContextFactory.Create();

            await CreateCardWithPrintingAsync(
                context,
                "Johnny Silverhand",
                rarity: "Rare",
                setName: "Beta",
                cardNumber: "B-001");

            var controller = CreateCardsController(context);

            var result = await controller.GetCards(
                null,
                null,
                null,
                null,
                CancellationToken.None);

            var okResult =
                Assert.IsType<OkObjectResult>(result.Result);

            var cards =
                Assert.IsAssignableFrom<IEnumerable<CardResponse>>(
                    okResult.Value);

            var returnedCard =
                Assert.Single(cards);

            Assert.Equal("Johnny Silverhand", returnedCard.Name);
            Assert.Equal("Rare", returnedCard.Rarity);
            Assert.Equal("Beta", returnedCard.SetName);
            Assert.Equal("B-001", returnedCard.CardNumber);
            Assert.Single(returnedCard.Printings);
        }

        [Fact]
        public async Task GetCards_WhenFilteringByRarity_ReturnsMatchingCards()
        {
            using var context = TestDbContextFactory.Create();

            await CreateCardWithPrintingAsync(
                context,
                "Legendary Card",
                rarity: "Legendary",
                cardNumber: "B-001");

            await CreateCardWithPrintingAsync(
                context,
                "Rare Card",
                rarity: "Rare",
                cardNumber: "B-002");

            var controller = CreateCardsController(context);

            var result = await controller.GetCards(
                null,
                "Legendary",
                null,
                null,
                CancellationToken.None);

            var okResult =
                Assert.IsType<OkObjectResult>(result.Result);

            var cards =
                Assert.IsAssignableFrom<IEnumerable<CardResponse>>(
                    okResult.Value);

            var returnedCard =
                Assert.Single(cards);

            Assert.Equal("Legendary Card", returnedCard.Name);
            Assert.Equal("Legendary", returnedCard.Rarity);
        }

        [Fact]
        public async Task GetCards_WhenSearchingByName_ReturnsMatchingCards()
        {
            using var context = TestDbContextFactory.Create();

            await CreateCardWithPrintingAsync(
                context,
                "Kai Blackwire Sato",
                rarity: "Legendary",
                cardNumber: "B-001");

            await CreateCardWithPrintingAsync(
                context,
                "Madam Echo",
                rarity: "Epic",
                cardNumber: "B-002");

            var controller = CreateCardsController(context);

            var result = await controller.GetCards(
                "Kai",
                null,
                null,
                null,
                CancellationToken.None);

            var okResult =
                Assert.IsType<OkObjectResult>(result.Result);

            var cards =
                Assert.IsAssignableFrom<IEnumerable<CardResponse>>(
                    okResult.Value);

            var returnedCard =
                Assert.Single(cards);

            Assert.Equal("Kai Blackwire Sato", returnedCard.Name);
        }

        [Fact]
        public async Task GetCardById_WhenCardExists_ReturnsOkWithCard()
        {
            using var context = TestDbContextFactory.Create();

            var card = await CreateCardWithPrintingAsync(
                context,
                "Rebecca",
                rarity: "Rare",
                setName: "Beta",
                cardNumber: "B-007");

            var controller = CreateCardsController(context);

            var result = await controller.GetCardById(
                card.Id,
                CancellationToken.None);

            var okResult =
                Assert.IsType<OkObjectResult>(result.Result);

            var returnedCard =
                Assert.IsType<CardResponse>(okResult.Value);

            Assert.Equal(card.Id, returnedCard.Id);
            Assert.Equal("Rebecca", returnedCard.Name);
            Assert.Equal("Beta", returnedCard.SetName);
            Assert.Equal("Rare", returnedCard.Rarity);
            Assert.Equal("B-007", returnedCard.CardNumber);
            Assert.NotNull(returnedCard.CardPrintingId);
            Assert.Single(returnedCard.Printings);
        }

        [Fact]
        public async Task GetCardById_WhenCardDoesNotExist_ReturnsNotFound()
        {
            using var context = TestDbContextFactory.Create();

            var controller = CreateCardsController(context);

            var result = await controller.GetCardById(
                999,
                CancellationToken.None);

            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task CreateCard_WhenRequestIsValid_CreatesCardAndPrinting()
        {
            using var context = TestDbContextFactory.Create();

            var controller = CreateCardsController(context);

            var request = new CreateCardRequest
            {
                Name = "   Rebecca   ",
                SetName = "   Beta   ",
                Rarity = "   Rare   ",
                Colour = "   Red   ",
                CardType = "   Legend   ",
                Classification = "   Character   ",
                CardNumber = "   B-007   ",
                ImageUrl = "   /images/cards/rebecca.png   ",
                IsFoil = true
            };

            var result = await controller.CreateCard(
                request,
                CancellationToken.None);

            var createdResult =
                Assert.IsType<CreatedAtActionResult>(result.Result);

            var createdCard =
                Assert.IsType<CardResponse>(createdResult.Value);

            Assert.Equal("Rebecca", createdCard.Name);
            Assert.Equal("Beta", createdCard.SetName);
            Assert.Equal("Rare", createdCard.Rarity);
            Assert.Equal("Red", createdCard.Colour);
            Assert.Equal("B-007", createdCard.CardNumber);
            Assert.True(createdCard.IsFoil);
            Assert.NotNull(createdCard.CardPrintingId);
            Assert.Single(createdCard.Printings);

            var savedCard =
                Assert.Single(context.Cards);

            var savedPrinting =
                Assert.Single(context.CardPrintings);

            Assert.Equal(savedCard.Id, savedPrinting.CardId);
            Assert.Equal("B-007", savedPrinting.CardNumber);
            Assert.Equal("Rare", savedPrinting.Rarity);
            Assert.True(savedPrinting.IsFoil);

            var savedSet =
                Assert.Single(context.CardSets);

            Assert.Equal("Beta", savedSet.Name);
        }

        [Fact]
        public async Task CreateCard_WhenOnlySetNameIsProvided_ReturnsBadRequest()
        {
            using var context = TestDbContextFactory.Create();

            var controller = CreateCardsController(context);

            var request = new CreateCardRequest
            {
                Name = "Rebecca",
                SetName = "Beta"
            };

            var result = await controller.CreateCard(
                request,
                CancellationToken.None);

            ProblemDetailsAssert.IsProblem(
                result.Result!,
                StatusCodes.Status400BadRequest,
                "Invalid printing data.",
                "SetName and CardNumber must be supplied together when creating a printing.");

            Assert.Empty(context.Cards);
            Assert.Empty(context.CardPrintings);
        }

        [Fact]
        public async Task UpdateCard_WhenCardExists_UpdatesCardAndPrinting()
        {
            using var context = TestDbContextFactory.Create();

            var card = await CreateCardWithPrintingAsync(
                context,
                "Old Name",
                rarity: "Rare",
                setName: "Beta",
                cardNumber: "B-001");

            var printing =
                Assert.Single(context.CardPrintings);

            var controller = CreateCardsController(context);

            var request = new UpdateCardRequest
            {
                Name = "Updated Name",
                CardPrintingId = printing.Id,
                SetName = "Full Release",
                Rarity = "Legendary",
                Colour = "Blue",
                CardNumber = "R-001",
                IsFoil = true
            };

            var result = await controller.UpdateCard(
                card.Id,
                request,
                CancellationToken.None);

            Assert.IsType<NoContentResult>(result);

            var updatedCard =
                await context.Cards.FindAsync(card.Id);

            var updatedPrinting =
                await context.CardPrintings.FindAsync(printing.Id);

            Assert.NotNull(updatedCard);
            Assert.NotNull(updatedPrinting);

            Assert.Equal("Updated Name", updatedCard!.Name);
            Assert.Equal("Blue", updatedCard.Colour);

            Assert.Equal("Legendary", updatedPrinting!.Rarity);
            Assert.Equal("R-001", updatedPrinting.CardNumber);
            Assert.True(updatedPrinting.IsFoil);

            var updatedSet =
                await context.CardSets.FindAsync(
                    updatedPrinting.CardSetId);

            Assert.NotNull(updatedSet);
            Assert.Equal("Full Release", updatedSet!.Name);
        }

        [Fact]
        public async Task UpdateCard_WhenCardDoesNotExist_ReturnsNotFound()
        {
            using var context = TestDbContextFactory.Create();

            var controller = CreateCardsController(context);

            var request = new UpdateCardRequest
            {
                Name = "Updated Name"
            };

            var result = await controller.UpdateCard(
                999,
                request,
                CancellationToken.None);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task DeleteCard_WhenCardExists_RemovesCardAndPrinting()
        {
            using var context = TestDbContextFactory.Create();

            var card = await CreateCardWithPrintingAsync(
                context,
                "Card To Delete");

            var controller = CreateCardsController(context);

            var result = await controller.DeleteCard(
                card.Id,
                CancellationToken.None);

            Assert.IsType<NoContentResult>(result);

            Assert.Empty(context.Cards);
            Assert.Empty(context.CardPrintings);
        }

        [Fact]
        public async Task DeleteCard_WhenPrintingIsUsedByOwnedCard_ReturnsConflict()
        {
            using var context = TestDbContextFactory.Create();

            var card = await CreateCardWithPrintingAsync(
                context,
                "Protected Card");

            var printing =
                Assert.Single(context.CardPrintings);

            var user = new AppUser
            {
                Id = Guid.NewGuid(),
                UserName = "collector",
                PasswordHash = "hashed-password"
            };

            context.Users.Add(user);

            context.OwnedCards.Add(new OwnedCard
            {
                UserId = user.Id,
                CardPrintingId = printing.Id,
                QuantityOwned = 1
            });

            await context.SaveChangesAsync();

            var controller = CreateCardsController(context);

            var result = await controller.DeleteCard(
                card.Id,
                CancellationToken.None);

            ProblemDetailsAssert.IsProblem(
                result,
                StatusCodes.Status409Conflict,
                "Card is referenced by collector data.",
                "This card cannot be deleted while one of its printings is referenced by collection or wishlist data.");

            Assert.NotNull(
                await context.Cards.FindAsync(card.Id));

            Assert.NotNull(
                await context.CardPrintings.FindAsync(printing.Id));
        }

        [Fact]
        public async Task DeleteCard_WhenCardDoesNotExist_ReturnsNotFound()
        {
            using var context = TestDbContextFactory.Create();

            var controller = CreateCardsController(context);

            var result = await controller.DeleteCard(
                999,
                CancellationToken.None);

            Assert.IsType<NotFoundResult>(result);
        }
    }
}
