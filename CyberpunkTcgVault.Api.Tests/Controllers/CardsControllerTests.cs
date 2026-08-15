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
            string cardNumber = "B-001",
            string setCode = "TEST",
            string colour = "Red",
            string cardType = "Legend",
            string classification = "Character",
            string? keywords = null,
            int? cost = null,
            int? power = null,
            int? ram = null,
            int? eddies = null)
        {
            var card = new Card
            {
                Name = name,
                Colour = colour,
                CardType = cardType,
                Classification = classification,
                Keywords = keywords,
                Cost = cost,
                Power = power,
                RamCost = ram,
                Eddies = eddies
            };

            var cardSet = new CardSet
            {
                Name = setName,
                Code = setCode
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
                new CardCatalogueQuery(),
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
                new CardCatalogueQuery
                {
                    Rarity = "Legendary"
                },
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
                new CardCatalogueQuery
                {
                    Name = "Kai"
                },
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
        public async Task GetCards_WhenFilteringByColour_ReturnsMatchingCards()
        {
            using var context = TestDbContextFactory.Create();

            await CreateCardWithPrintingAsync(
                context,
                "Red Card",
                colour: "Red");

            await CreateCardWithPrintingAsync(
                context,
                "Blue Card",
                cardNumber: "B-002",
                colour: "Blue");

            var controller = CreateCardsController(context);

            var result = await controller.GetCards(
                new CardCatalogueQuery { Colour = "Blue" },
                CancellationToken.None);

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var cards = Assert.IsAssignableFrom<IEnumerable<CardResponse>>(ok.Value);
            var card = Assert.Single(cards);

            Assert.Equal("Blue Card", card.Name);
        }

        [Fact]
        public async Task GetCards_WhenFilteringByCardType_ReturnsMatchingCards()
        {
            using var context = TestDbContextFactory.Create();

            await CreateCardWithPrintingAsync(
                context,
                "Legend Card",
                cardType: "Legend");

            await CreateCardWithPrintingAsync(
                context,
                "Gear Card",
                cardNumber: "B-002",
                cardType: "Gear");

            var controller = CreateCardsController(context);

            var result = await controller.GetCards(
                new CardCatalogueQuery { CardType = "Gear" },
                CancellationToken.None);

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var cards = Assert.IsAssignableFrom<IEnumerable<CardResponse>>(ok.Value);

            Assert.Equal("Gear Card", Assert.Single(cards).Name);
        }

        [Fact]
        public async Task GetCards_WhenFilteringByTypeAlias_ReturnsMatchingCards()
        {
            using var context = TestDbContextFactory.Create();

            await CreateCardWithPrintingAsync(
                context,
                "Action Card",
                cardType: "Action");

            var controller = CreateCardsController(context);

            var result = await controller.GetCards(
                new CardCatalogueQuery { Type = "Action" },
                CancellationToken.None);

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var cards = Assert.IsAssignableFrom<IEnumerable<CardResponse>>(ok.Value);

            Assert.Equal("Action Card", Assert.Single(cards).Name);
        }

        [Fact]
        public async Task GetCards_WhenFilteringByClassification_PreservesCompatibility()
        {
            using var context = TestDbContextFactory.Create();

            await CreateCardWithPrintingAsync(
                context,
                "Character Card",
                classification: "Character");

            await CreateCardWithPrintingAsync(
                context,
                "Location Card",
                cardNumber: "B-002",
                classification: "Location");

            var controller = CreateCardsController(context);

            var result = await controller.GetCards(
                new CardCatalogueQuery { Classification = "Location" },
                CancellationToken.None);

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var cards = Assert.IsAssignableFrom<IEnumerable<CardResponse>>(ok.Value);

            Assert.Equal("Location Card", Assert.Single(cards).Name);
        }

        [Fact]
        public async Task GetCards_WhenFilteringByCompleteTag_DoesNotMatchSubstring()
        {
            using var context = TestDbContextFactory.Create();

            await CreateCardWithPrintingAsync(
                context,
                "Solo Card",
                keywords: "Solo, Netrunner");

            await CreateCardWithPrintingAsync(
                context,
                "Soloist Card",
                cardNumber: "B-002",
                keywords: "Soloist, Tech");

            var controller = CreateCardsController(context);

            var result = await controller.GetCards(
                new CardCatalogueQuery { Tags = "Solo" },
                CancellationToken.None);

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var cards = Assert.IsAssignableFrom<IEnumerable<CardResponse>>(ok.Value).ToList();

            Assert.Single(cards);
            Assert.Equal("Solo Card", cards[0].Name);
        }

        [Fact]
        public async Task GetCards_WhenFilteringByCost_ReturnsMatchingCards()
        {
            using var context = TestDbContextFactory.Create();

            await CreateCardWithPrintingAsync(context, "Cost Two", cost: 2);
            await CreateCardWithPrintingAsync(context, "Cost Three", cardNumber: "B-002", cost: 3);

            var controller = CreateCardsController(context);
            var result = await controller.GetCards(
                new CardCatalogueQuery { Cost = 3 },
                CancellationToken.None);

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var cards = Assert.IsAssignableFrom<IEnumerable<CardResponse>>(ok.Value);

            Assert.Equal("Cost Three", Assert.Single(cards).Name);
        }

        [Fact]
        public async Task GetCards_WhenFilteringByPower_ReturnsMatchingCards()
        {
            using var context = TestDbContextFactory.Create();

            await CreateCardWithPrintingAsync(context, "Power One", power: 1);
            await CreateCardWithPrintingAsync(context, "Power Five", cardNumber: "B-002", power: 5);

            var controller = CreateCardsController(context);
            var result = await controller.GetCards(
                new CardCatalogueQuery { Power = 5 },
                CancellationToken.None);

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var cards = Assert.IsAssignableFrom<IEnumerable<CardResponse>>(ok.Value);

            Assert.Equal("Power Five", Assert.Single(cards).Name);
        }

        [Fact]
        public async Task GetCards_WhenFilteringByRam_ReturnsMatchingCards()
        {
            using var context = TestDbContextFactory.Create();

            await CreateCardWithPrintingAsync(context, "RAM Two", ram: 2);
            await CreateCardWithPrintingAsync(context, "RAM Four", cardNumber: "B-002", ram: 4);

            var controller = CreateCardsController(context);
            var result = await controller.GetCards(
                new CardCatalogueQuery { Ram = 4 },
                CancellationToken.None);

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var cards = Assert.IsAssignableFrom<IEnumerable<CardResponse>>(ok.Value);

            Assert.Equal("RAM Four", Assert.Single(cards).Name);
        }

        [Fact]
        public async Task GetCards_WhenFilteringByEddies_ReturnsMatchingCards()
        {
            using var context = TestDbContextFactory.Create();

            await CreateCardWithPrintingAsync(context, "Eddies Two", eddies: 2);
            await CreateCardWithPrintingAsync(context, "Eddies Six", cardNumber: "B-002", eddies: 6);

            var controller = CreateCardsController(context);
            var result = await controller.GetCards(
                new CardCatalogueQuery { Eddies = 6 },
                CancellationToken.None);

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var cards = Assert.IsAssignableFrom<IEnumerable<CardResponse>>(ok.Value);

            Assert.Equal("Eddies Six", Assert.Single(cards).Name);
        }

        [Fact]
        public async Task GetCards_WhenMultipleCardFiltersAreSupplied_UsesAndSemantics()
        {
            using var context = TestDbContextFactory.Create();

            await CreateCardWithPrintingAsync(
                context,
                "Exact Match",
                colour: "Yellow",
                cardType: "Character",
                cost: 3,
                power: 4);

            await CreateCardWithPrintingAsync(
                context,
                "Wrong Power",
                cardNumber: "B-002",
                colour: "Yellow",
                cardType: "Character",
                cost: 3,
                power: 2);

            var controller = CreateCardsController(context);
            var result = await controller.GetCards(
                new CardCatalogueQuery
                {
                    Colour = "Yellow",
                    CardType = "Character",
                    Cost = 3,
                    Power = 4
                },
                CancellationToken.None);

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var cards = Assert.IsAssignableFrom<IEnumerable<CardResponse>>(ok.Value);

            Assert.Equal("Exact Match", Assert.Single(cards).Name);
        }

        [Fact]
        public async Task GetCards_WhenCardAndPrintingFiltersAreSupplied_UsesAndSemantics()
        {
            using var context = TestDbContextFactory.Create();

            await CreateCardWithPrintingAsync(
                context,
                "Exact Match",
                rarity: "Rare",
                setName: "Night City Legends",
                setCode: "NCL",
                colour: "Blue");

            await CreateCardWithPrintingAsync(
                context,
                "Wrong Colour",
                rarity: "Rare",
                setName: "Night City Legends",
                cardNumber: "NCL-002",
                setCode: "NCL",
                colour: "Red");

            var controller = CreateCardsController(context);
            var result = await controller.GetCards(
                new CardCatalogueQuery
                {
                    Colour = "Blue",
                    SetCode = "NCL",
                    Rarity = "Rare"
                },
                CancellationToken.None);

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var cards = Assert.IsAssignableFrom<IEnumerable<CardResponse>>(ok.Value);

            Assert.Equal("Exact Match", Assert.Single(cards).Name);
        }

        [Fact]
        public async Task GetCards_WhenFilteringBySetCode_ReturnsMatchingCards()
        {
            using var context = TestDbContextFactory.Create();

            await CreateCardWithPrintingAsync(
                context,
                "NCL Card",
                setName: "Night City Legends",
                setCode: "NCL");

            await CreateCardWithPrintingAsync(
                context,
                "Other Set",
                setName: "Beta",
                cardNumber: "B-002",
                setCode: "BET");

            var controller = CreateCardsController(context);
            var result = await controller.GetCards(
                new CardCatalogueQuery { SetCode = "NCL" },
                CancellationToken.None);

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var cards = Assert.IsAssignableFrom<IEnumerable<CardResponse>>(ok.Value);

            Assert.Equal("NCL Card", Assert.Single(cards).Name);
        }

        [Fact]
        public async Task GetCards_WhenSetAndRarityAreOnDifferentPrintings_DoesNotMatch()
        {
            using var context = TestDbContextFactory.Create();

            var card = new Card
            {
                Name = "Multi Printing",
                Colour = "Red",
                CardType = "Character"
            };

            card.CardPrintings.Add(new CardPrinting
            {
                CardSet = new CardSet
                {
                    Name = "Night City Legends",
                    Code = "NCL"
                },
                CardNumber = "NCL-001",
                Rarity = "Common",
                LanguageCode = "en"
            });

            card.CardPrintings.Add(new CardPrinting
            {
                CardSet = new CardSet
                {
                    Name = "Promo",
                    Code = "PRO"
                },
                CardNumber = "PRO-001",
                Rarity = "Rare",
                LanguageCode = "en"
            });

            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var controller = CreateCardsController(context);
            var result = await controller.GetCards(
                new CardCatalogueQuery
                {
                    SetCode = "NCL",
                    Rarity = "Rare"
                },
                CancellationToken.None);

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var cards = Assert.IsAssignableFrom<IEnumerable<CardResponse>>(ok.Value);

            Assert.Empty(cards);
        }

        [Fact]
        public async Task GetCards_WhenNumericValueIsNull_DoesNotMatchNumericFilter()
        {
            using var context = TestDbContextFactory.Create();

            await CreateCardWithPrintingAsync(context, "Unknown Cost", cost: null);
            await CreateCardWithPrintingAsync(context, "Known Cost", cardNumber: "B-002", cost: 2);

            var controller = CreateCardsController(context);
            var result = await controller.GetCards(
                new CardCatalogueQuery { Cost = 2 },
                CancellationToken.None);

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var cards = Assert.IsAssignableFrom<IEnumerable<CardResponse>>(ok.Value);

            Assert.Equal("Known Cost", Assert.Single(cards).Name);
        }

        [Fact]
        public async Task GetCards_WhenFilterValueDoesNotExist_ReturnsEmptyCollection()
        {
            using var context = TestDbContextFactory.Create();

            await CreateCardWithPrintingAsync(context, "Existing Card");

            var controller = CreateCardsController(context);
            var result = await controller.GetCards(
                new CardCatalogueQuery { Colour = "Impossible Colour" },
                CancellationToken.None);

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var cards = Assert.IsAssignableFrom<IEnumerable<CardResponse>>(ok.Value);

            Assert.Empty(cards);
        }

        [Fact]
        public async Task GetCards_DefaultSetOrder_IsDeterministic()
        {
            using var context = TestDbContextFactory.Create();

            await CreateCardWithPrintingAsync(
                context,
                "Zulu",
                setName: "Second",
                cardNumber: "002",
                setCode: "BBB");

            await CreateCardWithPrintingAsync(
                context,
                "Alpha",
                setName: "First",
                cardNumber: "010",
                setCode: "AAA");

            await CreateCardWithPrintingAsync(
                context,
                "Beta",
                setName: "First",
                cardNumber: "001",
                setCode: "AAA");

            var controller = CreateCardsController(context);
            var result = await controller.GetCards(
                new CardCatalogueQuery(),
                CancellationToken.None);

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var cards = Assert.IsAssignableFrom<IEnumerable<CardResponse>>(ok.Value).ToList();

            Assert.Equal(
                new[] { "Beta", "Alpha", "Zulu" },
                cards.Select(card => card.Name).ToArray());
        }

        [Fact]
        public async Task GetFilterOptions_ReturnsOnlyDistinctValuesThatExist()
        {
            using var context = TestDbContextFactory.Create();

            await CreateCardWithPrintingAsync(
                context,
                "First",
                rarity: "Rare",
                setName: "Night City Legends",
                setCode: "NCL",
                colour: "Blue",
                cardType: "Character",
                keywords: "Solo, Netrunner",
                cost: 2,
                power: 3,
                ram: 4,
                eddies: 5);

            await CreateCardWithPrintingAsync(
                context,
                "Second",
                rarity: "Rare",
                setName: "Night City Legends",
                cardNumber: "NCL-002",
                setCode: "NCL",
                colour: "Blue",
                cardType: "Gear",
                keywords: "Solo; Tech",
                cost: 2,
                power: null,
                ram: 1,
                eddies: null);

            await CreateCardWithPrintingAsync(
                context,
                "Placeholder",
                rarity: "Unknown",
                setName: "Unknown",
                cardNumber: "UNK-001",
                setCode: "Unknown",
                colour: "Unknown",
                cardType: "Unknown",
                keywords: "Unknown");

            var controller = CreateCardsController(context);
            var result = await controller.GetFilterOptions(CancellationToken.None);

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var options = Assert.IsType<CardFilterOptionsResponse>(ok.Value);

            Assert.Equal(new[] { "Blue" }, options.Colours);
            Assert.Equal(new[] { "Character", "Gear" }, options.CardTypes);
            Assert.Equal(new[] { "Netrunner", "Solo", "Tech" }, options.Tags);
            Assert.Equal(new[] { 2 }, options.Costs);
            Assert.Equal(new[] { 3 }, options.Powers);
            Assert.Equal(new[] { 1, 4 }, options.RamValues);
            Assert.Equal(new[] { 5 }, options.EddiesValues);
            Assert.Single(options.Sets);
            Assert.Equal("NCL", options.Sets[0].Code);
            Assert.Equal("Night City Legends", options.Sets[0].Name);
            Assert.Equal(new[] { "Rare" }, options.Rarities);
        }

        [Fact]
        public async Task GetCardsPaged_ReturnsCountAndRequestedPage()
        {
            using var context = TestDbContextFactory.Create();

            await CreateCardWithPrintingAsync(context, "A", cardNumber: "001", setCode: "AAA");
            await CreateCardWithPrintingAsync(context, "B", cardNumber: "002", setCode: "AAA");
            await CreateCardWithPrintingAsync(context, "C", cardNumber: "003", setCode: "AAA");

            var controller = CreateCardsController(context);
            var result = await controller.GetCardsPaged(
                new CardCatalogueQuery { SortBy = "name" },
                page: 2,
                pageSize: 2,
                cancellationToken: CancellationToken.None);

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var page = Assert.IsType<PagedResponse<CardResponse>>(ok.Value);

            Assert.Equal(2, page.Page);
            Assert.Equal(2, page.PageSize);
            Assert.Equal(3, page.TotalCount);
            Assert.Equal(2, page.TotalPages);
            Assert.Single(page.Items);
            Assert.Equal("C", page.Items[0].Name);
        }

        [Fact]
        public async Task GetCards_WhenSortByIsNotSupported_ReturnsBadRequest()
        {
            using var context = TestDbContextFactory.Create();

            var controller = CreateCardsController(context);

            var result = await controller.GetCards(
                new CardCatalogueQuery
                {
                    SortBy = "arbitraryDatabaseColumn"
                },
                CancellationToken.None);

            ProblemDetailsAssert.IsProblem(
                result.Result!,
                StatusCodes.Status400BadRequest,
                "Invalid catalogue sort.");
        }

        [Fact]
        public async Task GetCardsPaged_WhenPageSizeExceedsMaximum_ReturnsBadRequest()
        {
            using var context = TestDbContextFactory.Create();

            var controller = CreateCardsController(context);

            var result = await controller.GetCardsPaged(
                new CardCatalogueQuery(),
                page: 1,
                pageSize: 101,
                cancellationToken: CancellationToken.None);

            ProblemDetailsAssert.IsProblem(
                result.Result!,
                StatusCodes.Status400BadRequest,
                "Invalid page size.",
                "PageSize must be between 1 and 100.");
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
