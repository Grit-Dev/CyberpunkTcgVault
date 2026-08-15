using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Services;
using CyberpunkTcgVault.Api.Services.Results;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;

namespace CyberpunkTcgVault.Api.Tests;

public class OwnedCardServiceTests
{
    [Fact]
    public async Task GetOwnedCards_OnlyReturnsCurrentUsersDataAndPrintingArtwork()
    {
        await using var db = await TestDb.CreateAsync();
        var user = TestDb.CreateUser("collector@example.com");
        var otherUser = TestDb.CreateUser("other@example.com");
        db.Context.Users.AddRange(user, otherUser);
        await db.Context.SaveChangesAsync();

        var printings = await db.SeedPrintingsAsync(2);

        db.Context.OwnedCards.AddRange(
            new OwnedCard
            {
                UserId = user.Id,
                CardPrintingId = printings[0].Id,
                QuantityOwned = 2
            },
            new OwnedCard
            {
                UserId = otherUser.Id,
                CardPrintingId = printings[1].Id,
                QuantityOwned = 1
            });
        await db.Context.SaveChangesAsync();
        db.Context.ChangeTracker.Clear();

        var service = new OwnedCardService(
            db.Context,
            NullLogger<OwnedCardService>.Instance);

        var results = await service.GetOwnedCardsAsync(
            user.Id,
            CancellationToken.None);

        var ownedCard = Assert.Single(results);
        Assert.Equal(printings[0].Id, ownedCard.CardPrintingId);
        Assert.Equal("/images/cards/test-card-1.webp", ownedCard.ImageUrl);

        var otherUsersRecord = await db.Context.OwnedCards
            .AsNoTracking()
            .SingleAsync(card => card.UserId == otherUser.Id);

        Assert.Null(await service.GetOwnedCardByIdAsync(
            user.Id,
            otherUsersRecord.Id,
            CancellationToken.None));
    }

    [Fact]
    public async Task CreateOwnedCard_ReturnsDuplicateForSameUserAndPrinting()
    {
        await using var db = await TestDb.CreateAsync();
        var user = TestDb.CreateUser("collector@example.com");
        db.Context.Users.Add(user);
        await db.Context.SaveChangesAsync();
        var printing = (await db.SeedPrintingsAsync(1)).Single();

        db.Context.OwnedCards.Add(new OwnedCard
        {
            UserId = user.Id,
            CardPrintingId = printing.Id,
            QuantityOwned = 1
        });
        await db.Context.SaveChangesAsync();
        db.Context.ChangeTracker.Clear();

        var service = new OwnedCardService(
            db.Context,
            NullLogger<OwnedCardService>.Instance);

        var result = await service.CreateOwnedCardAsync(
            user.Id,
            new CreateOwnedCardRequest
            {
                CardPrintingId = printing.Id,
                QuantityOwned = 2
            },
            CancellationToken.None);

        Assert.Equal(OwnedCardCreateStatus.Duplicate, result.Status);
        Assert.Equal(
            1,
            await db.Context.OwnedCards.CountAsync(card =>
                card.UserId == user.Id &&
                card.CardPrintingId == printing.Id));
    }

    [Fact]
    public async Task UpdateOwnedCard_ChangesCurrentUsersQuantity()
    {
        await using var db = await TestDb.CreateAsync();
        var user = TestDb.CreateUser("collector@example.com");
        db.Context.Users.Add(user);
        await db.Context.SaveChangesAsync();
        var printing = (await db.SeedPrintingsAsync(1)).Single();

        var ownedCard = new OwnedCard
        {
            UserId = user.Id,
            CardPrintingId = printing.Id,
            QuantityOwned = 1
        };

        db.Context.OwnedCards.Add(ownedCard);
        await db.Context.SaveChangesAsync();
        db.Context.ChangeTracker.Clear();

        var service = new OwnedCardService(
            db.Context,
            NullLogger<OwnedCardService>.Instance);

        var updated = await service.UpdateOwnedCardAsync(
            user.Id,
            ownedCard.Id,
            new UpdateOwnedCardRequest
            {
                QuantityOwned = 3,
                Condition = "Near Mint"
            },
            CancellationToken.None);

        Assert.True(updated);

        var stored = await db.Context.OwnedCards
            .AsNoTracking()
            .SingleAsync(card => card.Id == ownedCard.Id);

        Assert.Equal(3, stored.QuantityOwned);
        Assert.Equal("Near Mint", stored.Condition);
    }

    [Fact]
    public async Task DeleteOwnedCard_CannotDeleteAnotherUsersRecord()
    {
        await using var db = await TestDb.CreateAsync();
        var user = TestDb.CreateUser("collector@example.com");
        var otherUser = TestDb.CreateUser("other@example.com");
        db.Context.Users.AddRange(user, otherUser);
        await db.Context.SaveChangesAsync();
        var printing = (await db.SeedPrintingsAsync(1)).Single();

        var otherOwnedCard = new OwnedCard
        {
            UserId = otherUser.Id,
            CardPrintingId = printing.Id,
            QuantityOwned = 1
        };

        db.Context.OwnedCards.Add(otherOwnedCard);
        await db.Context.SaveChangesAsync();
        db.Context.ChangeTracker.Clear();

        var service = new OwnedCardService(
            db.Context,
            NullLogger<OwnedCardService>.Instance);

        var deleted = await service.DeleteOwnedCardAsync(
            user.Id,
            otherOwnedCard.Id,
            CancellationToken.None);

        Assert.False(deleted);
        Assert.True(await db.Context.OwnedCards
            .AsNoTracking()
            .AnyAsync(card => card.Id == otherOwnedCard.Id));
    }
}
