using CyberpunkTcgVault.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CyberpunkTcgVault.Api.Tests;

public class ModelConstraintTests
{
    [Fact]
    public async Task CollectorPrintingRows_HaveUniqueUserPrintingIndexes()
    {
        await using var db = await TestDb.CreateAsync();

        AssertUniqueUserPrintingIndex<OwnedCard>(db.Context.Model);
        AssertUniqueUserPrintingIndex<WishListItem>(db.Context.Model);
    }

    [Fact]
    public async Task AppUser_NormalizedEmailIndexIsUnique()
    {
        await using var db = await TestDb.CreateAsync();

        var entityType =
            db.Context.Model.FindEntityType(typeof(AppUser));

        Assert.NotNull(entityType);

        var uniqueEmailIndex = entityType!.GetIndexes()
            .SingleOrDefault(index =>
                index.IsUnique &&
                index.Properties.Select(property => property.Name)
                    .SequenceEqual(new[] { "NormalizedEmail" }));

        Assert.NotNull(uniqueEmailIndex);
    }

    private static void AssertUniqueUserPrintingIndex<TEntity>(
        Microsoft.EntityFrameworkCore.Metadata.IModel model)
    {
        var entityType = model.FindEntityType(typeof(TEntity));
        Assert.NotNull(entityType);

        var uniqueIndex = entityType!.GetIndexes()
            .SingleOrDefault(index =>
                index.IsUnique &&
                index.Properties.Select(property => property.Name)
                    .SequenceEqual(new[] { "UserId", "CardPrintingId" }));

        Assert.NotNull(uniqueIndex);
    }
}
