using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Services;
using CyberpunkTcgVault.Api.Services.Results;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;

namespace CyberpunkTcgVault.Api.Tests;

public class WishListItemServiceTests
{
    [Fact]
    public async Task GetWishListItems_ReturnsPrintingArtwork()
    {
        await using var db = await TestDb.CreateAsync();
        var user = TestDb.CreateUser("collector@example.com");
        db.Context.Users.Add(user);
        await db.Context.SaveChangesAsync();
        var printing = (await db.SeedPrintingsAsync(1)).Single();

        db.Context.WishList.Add(new WishListItem
        {
            UserId = user.Id,
            CardPrintingId = printing.Id,
            WantedQuantity = 1
        });
        await db.Context.SaveChangesAsync();
        db.Context.ChangeTracker.Clear();

        var service = new WishListItemService(
            db.Context,
            NullLogger<WishListItemService>.Instance);

        var item = Assert.Single(await service.GetWishListItemsAsync(
            user.Id,
            CancellationToken.None));

        Assert.Equal(printing.Id, item.CardPrintingId);
        Assert.Equal("/images/cards/test-card-1.webp", item.ImageUrl);
    }

    [Fact]
    public async Task CreateWishListItem_ReturnsDuplicateForSamePrinting()
    {
        await using var db = await TestDb.CreateAsync();
        var user = TestDb.CreateUser("collector@example.com");
        db.Context.Users.Add(user);
        await db.Context.SaveChangesAsync();
        var printing = (await db.SeedPrintingsAsync(1)).Single();

        db.Context.WishList.Add(new WishListItem
        {
            UserId = user.Id,
            CardPrintingId = printing.Id,
            WantedQuantity = 1
        });
        await db.Context.SaveChangesAsync();
        db.Context.ChangeTracker.Clear();

        var service = new WishListItemService(
            db.Context,
            NullLogger<WishListItemService>.Instance);

        var result = await service.CreateWishListItemAsync(
            user.Id,
            new CreateWishListItemRequest
            {
                CardPrintingId = printing.Id,
                WantedQuantity = 1
            },
            CancellationToken.None);

        Assert.Equal(WishListItemCreateStatus.Duplicate, result.Status);
    }
    [Fact]
    public async Task DeleteWishListItem_CannotDeleteAnotherUsersRecord()
    {
        await using var db = await TestDb.CreateAsync();
        var user = TestDb.CreateUser("collector@example.com");
        var otherUser = TestDb.CreateUser("other@example.com");
        db.Context.Users.AddRange(user, otherUser);
        await db.Context.SaveChangesAsync();
        var printing = (await db.SeedPrintingsAsync(1)).Single();

        var otherItem = new WishListItem
        {
            UserId = otherUser.Id,
            CardPrintingId = printing.Id,
            WantedQuantity = 1
        };

        db.Context.WishList.Add(otherItem);
        await db.Context.SaveChangesAsync();
        db.Context.ChangeTracker.Clear();

        var service = new WishListItemService(
            db.Context,
            NullLogger<WishListItemService>.Instance);

        var deleted = await service.DeleteWishListItemAsync(
            user.Id,
            otherItem.Id,
            CancellationToken.None);

        Assert.False(deleted);
        Assert.True(await db.Context.WishList
            .AsNoTracking()
            .AnyAsync(item => item.Id == otherItem.Id));
    }

}
