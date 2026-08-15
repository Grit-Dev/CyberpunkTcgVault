using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;

namespace CyberpunkTcgVault.Api.Tests;

public class DemoVaultServiceTests
{
    [Fact]
    public async Task ResetDemoCollectorData_OnlyReplacesDemoUsersPrivateData()
    {
        await using var db = await TestDb.CreateAsync();
        var demoUser = TestDb.CreateUser("demo@example.com");
        var normalUser = TestDb.CreateUser("collector@example.com");
        db.Context.Users.AddRange(demoUser, normalUser);
        await db.Context.SaveChangesAsync();

        var printings = await db.SeedPrintingsAsync(8);

        db.Context.OwnedCards.AddRange(
            new OwnedCard
            {
                UserId = demoUser.Id,
                CardPrintingId = printings[0].Id,
                QuantityOwned = 8
            },
            new OwnedCard
            {
                UserId = normalUser.Id,
                CardPrintingId = printings[1].Id,
                QuantityOwned = 3
            });

        db.Context.WishList.Add(new WishListItem
        {
            UserId = normalUser.Id,
            CardPrintingId = printings[2].Id,
            WantedQuantity = 2
        });

        db.Context.Products.Add(new CollectionProduct
        {
            UserId = normalUser.Id,
            ProductName = "Collector sealed product",
            Quantity = 1,
            IsSealed = true
        });

        await db.Context.SaveChangesAsync();
        db.Context.ChangeTracker.Clear();

        var service = new DemoVaultService(
            db.Context,
            NullLogger<DemoVaultService>.Instance);

        await service.ResetDemoCollectorDataAsync(
            demoUser.Id,
            CancellationToken.None);

        Assert.Equal(
            4,
            await db.Context.OwnedCards.CountAsync(card =>
                card.UserId == demoUser.Id));
        Assert.Equal(
            2,
            await db.Context.WishList.CountAsync(item =>
                item.UserId == demoUser.Id));
        Assert.Equal(
            2,
            await db.Context.Products.CountAsync(product =>
                product.UserId == demoUser.Id));

        Assert.Equal(
            1,
            await db.Context.OwnedCards.CountAsync(card =>
                card.UserId == normalUser.Id));
        Assert.Equal(
            1,
            await db.Context.WishList.CountAsync(item =>
                item.UserId == normalUser.Id));
        Assert.Equal(
            1,
            await db.Context.Products.CountAsync(product =>
                product.UserId == normalUser.Id));
    }
}
