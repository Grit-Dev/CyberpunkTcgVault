using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.Models;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace CyberpunkTcgVault.Api.Tests;

internal sealed class TestDb : IAsyncDisposable
{
    private TestDb(SqliteConnection connection, AppDbContext context)
    {
        Connection = connection;
        Context = context;
    }

    public SqliteConnection Connection { get; }

    public AppDbContext Context { get; }

    public static async Task<TestDb> CreateAsync()
    {
        var connection = new SqliteConnection("Data Source=:memory:");
        await connection.OpenAsync();

        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlite(connection)
            .Options;

        var context = new AppDbContext(options);
        await context.Database.EnsureCreatedAsync();

        return new TestDb(connection, context);
    }

    public async ValueTask DisposeAsync()
    {
        await Context.DisposeAsync();
        await Connection.DisposeAsync();
    }

    public static AppUser CreateUser(string email)
    {
        return new AppUser
        {
            Id = Guid.NewGuid(),
            UserName = email,
            NormalizedUserName = email.ToUpperInvariant(),
            Email = email,
            NormalizedEmail = email.ToUpperInvariant(),
            SecurityStamp = Guid.NewGuid().ToString()
        };
    }

    public async Task<IReadOnlyList<CardPrinting>> SeedPrintingsAsync(
        int count = 8)
    {
        var set = new CardSet
        {
            Name = "Night City Legend",
            Code = "NCL"
        };

        for (var index = 1; index <= count; index++)
        {
            var card = new Card
            {
                Name = $"Test Card {index}",
                Colour = "Yellow"
            };

            card.CardPrintings.Add(new CardPrinting
            {
                CardSet = set,
                CardNumber = index.ToString("000"),
                Rarity = "Rare",
                ImageUrl = $"/images/cards/test-card-{index}.webp",
                LanguageCode = "en"
            });

            Context.Cards.Add(card);
        }

        await Context.SaveChangesAsync();
        Context.ChangeTracker.Clear();

        return await Context.CardPrintings
            .AsNoTracking()
            .OrderBy(printing => printing.Id)
            .ToListAsync();
    }
}
