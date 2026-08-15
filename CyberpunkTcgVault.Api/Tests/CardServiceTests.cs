using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Services;
using Microsoft.Extensions.Logging.Abstractions;

namespace CyberpunkTcgVault.Api.Tests;

public class CardServiceTests
{
    [Fact]
    public async Task GetCardById_ReturnsLogicalCardWithAllPhysicalPrintings()
    {
        await using var db = await TestDb.CreateAsync();

        var card = new Card
        {
            Name = "V // StreetKid",
            Colour = "Yellow"
        };

        card.CardPrintings.Add(new CardPrinting
        {
            CardSet = new CardSet
            {
                Name = "Night City Legend",
                Code = "NCL"
            },
            CardNumber = "001",
            Rarity = "Rare",
            ImageUrl = "/images/cards/v-streetkid.png",
            LanguageCode = "en"
        });

        card.CardPrintings.Add(new CardPrinting
        {
            CardSet = new CardSet
            {
                Name = "Promo",
                Code = "PRM"
            },
            CardNumber = "P-001",
            Rarity = "Promo",
            ImageUrl = "/images/cards/v-streetkid-promo.png",
            LanguageCode = "en",
            IsPromo = true
        });

        db.Context.Cards.Add(card);
        await db.Context.SaveChangesAsync();
        db.Context.ChangeTracker.Clear();

        var service = new CardService(
            db.Context,
            NullLogger<CardService>.Instance);

        var result = await service.GetCardByIdAsync(
            card.Id,
            CancellationToken.None);

        Assert.NotNull(result);
        Assert.Equal("V // StreetKid", result!.Name);
        Assert.Equal(2, result.Printings.Count);
        Assert.Contains(result.Printings, printing =>
            printing.SetCode == "NCL" && printing.CardNumber == "001");
        Assert.Contains(result.Printings, printing =>
            printing.SetCode == "PRM" && printing.IsPromo);
    }
}
