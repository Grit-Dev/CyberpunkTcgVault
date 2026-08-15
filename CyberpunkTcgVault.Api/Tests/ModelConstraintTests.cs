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
