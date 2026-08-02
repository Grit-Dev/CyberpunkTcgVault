using CyberpunkTcgVault.Api.Controllers;
using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Tests.TestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;

namespace CyberpunkTcgVault.Api.Tests.Controllers
{
    public class CardsControllerTests
    { 
        private static CardsController CreateCardsController(AppDbContext context)
        {
            return new CardsController(context, NullLogger<CardsController>.Instance);
        }

        [Fact]
        public async Task GetCards_WhenCardsExist_ReturnOkWithTheCards()
        {
            // Arrange
            var context = TestDbContextFactory.Create();

            context.Cards.Add(new Card
            {
                Name = "Johnny Silverhand",
                SetName = "Beta",
                Rarity = "Rare",
                Colour = "Red",
                CardType = "Legend",
                Classification = "a",
                Keywords = "Keyword",
                Cost = 444,
                Power = 1,
                RamCost = 1,
                IsLegend = true,
                HasBetaSymbol = true,
                IsKickstarterVersion = true,
                IsRetailVersion = true,
                IsFoil = true,
                IsAltArt = true,
                IsBoxTopper = false,
                IsPromo = false,
                IsStarterDeckExclusive = true,
                CardNumber = null
                

            });

            await context.SaveChangesAsync();

            var controller = CreateCardsController(context);

            // Act
            var result = await controller.GetCards(null, null, null, null);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);

            var cards = Assert.IsAssignableFrom<IEnumerable<CardResponse>>(okResult.Value);

            Assert.Contains(cards, card => card.Name == "Johnny Silverhand");

        }

        [Fact]
        public async Task GetCards_WhenFilteringByRarity_ReturnsMatchingCards()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            context.Cards.AddRange(
                new Card
                {
                    Name = "Legendary Card",
                    Rarity = "Legendary"
                },
                new Card
                {
                    Name = "Rare Card",
                    Rarity = "Rare"
                });

            await context.SaveChangesAsync();

            var controller = CreateCardsController(context);

            // Act
            var result = await controller.GetCards(
                null,
                "Legendary",
                null,
                null);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);

            var cards = Assert.IsAssignableFrom<IEnumerable<CardResponse>>(okResult.Value);

            Assert.Single(cards);
            Assert.Contains(cards, card => card.Name == "Legendary Card");
        }

        [Fact]
        public async Task GetCards_WhenSearchingByName_ReturnsMatchingCards()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            context.Cards.AddRange(
                new Card
                {
                    Name = "Kai Blackwire Sato",
                    Rarity = "Legendary"
                },
                new Card
                {
                    Name = "Madam Echo",
                    Rarity = "Epic"
                });

            await context.SaveChangesAsync();

            var controller = CreateCardsController(context);

            // Act
            var result = await controller.GetCards(
                "Kai",
                null,
                null,
                null);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);

            var cards = Assert.IsAssignableFrom<IEnumerable<CardResponse>>(okResult.Value);

            Assert.Single(cards);
            Assert.Contains(cards, card => card.Name == "Kai Blackwire Sato");
        }

        [Fact]
        public async Task GetCardById_WhenCardExists_ReturnsOkWithCard()
        {
            // Arrange
            var context = TestDbContextFactory.Create();

            var card = new Card
            {
                Name = "Rebecca",
                SetName = "Beta",
                Rarity = "Rare",
                Colour = "Red",
                CardNumber = "Legend"
            };

            context.Cards.Add(card);

            await context.SaveChangesAsync();

            var controller = CreateCardsController(context);

            // Act
            var result = await controller.GetCardById(card.Id);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);

            var returnedCard = Assert.IsType<Card>(okResult.Value);

            Assert.Equal(card.Name, returnedCard.Name);
            Assert.Equal(card.Id, returnedCard.Id);
        }

        [Fact]
        public async Task CreateCard_WhenRequestIsValid_CreatesCard()
        {
            // Arrange
            var context = TestDbContextFactory.Create();

            var controller = CreateCardsController(context);

            var request = new CreateCardRequest
            {
                Name = "            Rebecca",
                SetName = "Beta           ",
                Rarity = "          Rare",
                Colour = "Red         ",
                CardNumber = "Legend"
            };

            // Act
            var result = await controller.CreateCard(request);


            var createResult = Assert.IsType<CreatedAtActionResult>(result.Result);

            var createCard = Assert.IsType<Card>(createResult.Value);

            Assert.Equal("Rebecca", createCard.Name);
            Assert.Equal("Beta", createCard.SetName);
            Assert.Equal("Rare", createCard.Rarity);
            Assert.Equal("Red", createCard.Colour);
            Assert.Equal("Legend", createCard.CardNumber);

            Assert.Contains(context.Cards, card => card.Name == "Rebecca");
        }

        [Fact]
        public async Task GetCardById_WhenCardDoesNotExist_ReturnsNotFound()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var controller = CreateCardsController(context);

            // Act
            var result = await controller.GetCardById(999);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task CreateCard_WhenNameIsEmpty_ReturnsBadRequest()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var controller = CreateCardsController(context);

            var request = new CreateCardRequest
            {
                Name = "   "
            };

            // Act
            var result = await controller.CreateCard(request);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public async Task UpdateCard_WhenCardExists_UpdatesCard()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var card = new Card
            {
                Name = "Old Name",
                SetName = "Beta",
                Rarity = "Rare",
                Colour = "Red"
            };

            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var controller = CreateCardsController(context);

            var request = new UpdateCardRequest
            {
                Name = "Updated Name",
                SetName = "Full Release",
                Rarity = "Legend",
                Colour = "Blue"
            };

            // Act
            var result = await controller.UpdateCard(card.Id, request);

            // Assert
            Assert.IsType<NoContentResult>(result);

            var updatedCard = await context.Cards.FindAsync(card.Id);

            Assert.NotNull(updatedCard);
            Assert.Equal("Updated Name", updatedCard.Name);
            Assert.Equal("Full Release", updatedCard.SetName);
        }

        [Fact]
        public async Task UpdateCard_WhenCardDoesNotExist_ReturnsNotFound()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var controller = CreateCardsController(context);

            var request = new UpdateCardRequest
            {
                Name = "Updated Name"
            };

            // Act
            var result = await controller.UpdateCard(999, request);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task DeleteCard_WhenCardExists_RemovesCard()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var card = new Card
            {
                Name = "Card To Delete"
            };

            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var controller = CreateCardsController(context);

            // Act
            var result = await controller.DeleteCard(card.Id);

            // Assert
            Assert.IsType<NoContentResult>(result);

            var deletedCard = await context.Cards.FindAsync(card.Id);

            Assert.Null(deletedCard);
        }

        [Fact]
        public async Task DeleteCard_WhenCardDoesNotExist_ReturnsNotFound()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var controller = CreateCardsController(context);

            // Act
            var result = await controller.DeleteCard(999);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

    }
}
