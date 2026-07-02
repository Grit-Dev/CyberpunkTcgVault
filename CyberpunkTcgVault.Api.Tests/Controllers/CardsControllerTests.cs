using CyberpunkTcgVault.Api.Controllers;
using CyberpunkTcgVault.Api.Data;
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

            context.Cards.Add(new Models.Card
            {
                Name = "Johnny Silverhand",
                SetName = "Beta",
                Rarity = "Rare",
                Colour = "Red",
                CardType = "Legend"

            });

            await context.SaveChangesAsync();

            var controller = CreateCardsController(context);

            // Act
            var result = await controller.GetCards();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);

            var cards = Assert.IsAssignableFrom<IEnumerable<Card>>(okResult.Value);

            Assert.Contains(cards, card => card.Name == "Johnny Silverhand");

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
    }
}
