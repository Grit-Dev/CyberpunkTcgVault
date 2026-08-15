using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Services;
using CyberpunkTcgVault.Api.Services.Results;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;

namespace CyberpunkTcgVault.Api.Tests;

public class CollectionProductServiceTests
{
    [Fact]
    public async Task GetProducts_OnlyReturnsCurrentUsersData()
    {
        await using var db = await TestDb.CreateAsync();
        var user = TestDb.CreateUser("collector@example.com");
        var otherUser = TestDb.CreateUser("other@example.com");
        db.Context.Users.AddRange(user, otherUser);
        await db.Context.SaveChangesAsync();

        db.Context.Products.AddRange(
            new CollectionProduct
            {
                UserId = user.Id,
                ProductName = "My sealed display",
                Quantity = 1,
                IsSealed = true
            },
            new CollectionProduct
            {
                UserId = otherUser.Id,
                ProductName = "Another collector display",
                Quantity = 1,
                IsSealed = true
            });
        await db.Context.SaveChangesAsync();
        db.Context.ChangeTracker.Clear();

        var service = new CollectionProductService(
            db.Context,
            NullLogger<CollectionProductService>.Instance);

        var product = Assert.Single(await service.GetProductsAsync(
            user.Id,
            CancellationToken.None));

        Assert.Equal("My sealed display", product.ProductName);
    }

    [Fact]
    public async Task UpdateProduct_CannotEditAnotherUsersRecord()
    {
        await using var db = await TestDb.CreateAsync();
        var user = TestDb.CreateUser("collector@example.com");
        var otherUser = TestDb.CreateUser("other@example.com");
        db.Context.Users.AddRange(user, otherUser);
        await db.Context.SaveChangesAsync();

        var otherProduct = new CollectionProduct
        {
            UserId = otherUser.Id,
            ProductName = "Other product",
            Quantity = 1,
            IsSealed = true
        };

        db.Context.Products.Add(otherProduct);
        await db.Context.SaveChangesAsync();
        db.Context.ChangeTracker.Clear();

        var service = new CollectionProductService(
            db.Context,
            NullLogger<CollectionProductService>.Instance);

        var result = await service.UpdateProductAsync(
            user.Id,
            otherProduct.Id,
            new UpdateCollectionProductRequest
            {
                ProductName = "Should not change",
                Quantity = 2,
                IsSealed = true
            },
            CancellationToken.None);

        Assert.Equal(CollectionProductUpdateResult.NotFound, result);

        var stored = await db.Context.Products
            .AsNoTracking()
            .SingleAsync(product => product.Id == otherProduct.Id);

        Assert.Equal("Other product", stored.ProductName);
        Assert.Equal(1, stored.Quantity);
    }
}
