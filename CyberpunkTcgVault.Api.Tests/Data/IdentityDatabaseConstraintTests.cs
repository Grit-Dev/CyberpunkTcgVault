using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.Models;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace CyberpunkTcgVault.Api.Tests.Data
{
    public class IdentityDatabaseConstraintTests
    {
        [Fact]
        public async Task NormalizedEmailIndex_PreventsDuplicateEmailRowsAtDatabaseLevel()
        {
            await using var connection =
                new SqliteConnection("Data Source=:memory:");

            await connection.OpenAsync();

            var options =
                new DbContextOptionsBuilder<AppDbContext>()
                    .UseSqlite(connection)
                    .Options;

            await using var context =
                new AppDbContext(options);

            await context.Database.EnsureCreatedAsync();

            context.Users.Add(CreateUser(
                "paul-one",
                "paul@example.com"));

            await context.SaveChangesAsync();

            context.Users.Add(CreateUser(
                "paul-two",
                "paul@example.com"));

            await Assert.ThrowsAsync<DbUpdateException>(
                () => context.SaveChangesAsync());

            context.ChangeTracker.Clear();

            var matchingUsers = await context.Users
                .AsNoTracking()
                .CountAsync(user =>
                    user.NormalizedEmail == "PAUL@EXAMPLE.COM");

            Assert.Equal(1, matchingUsers);
        }

        [Fact]
        public void IdentityModel_NormalizedEmailIndexIsUniqueAndFiltered()
        {
            var options =
                new DbContextOptionsBuilder<AppDbContext>()
                    .UseSqlite("Data Source=:memory:")
                    .Options;

            using var context = new AppDbContext(options);

            var userEntity =
                context.Model.FindEntityType(typeof(AppUser));

            Assert.NotNull(userEntity);

            var emailIndex = userEntity!.GetIndexes()
                .Single(index =>
                    index.Properties
                        .Select(property => property.Name)
                        .SequenceEqual(new[] { "NormalizedEmail" }));

            Assert.True(emailIndex.IsUnique);
            Assert.Equal(
                "[NormalizedEmail] IS NOT NULL",
                emailIndex.GetFilter());
        }

        private static AppUser CreateUser(
            string userName,
            string email)
        {
            return new AppUser
            {
                Id = Guid.NewGuid(),
                UserName = userName,
                NormalizedUserName = userName.ToUpperInvariant(),
                Email = email,
                NormalizedEmail = email.ToUpperInvariant(),
                SecurityStamp = Guid.NewGuid().ToString(),
                ConcurrencyStamp = Guid.NewGuid().ToString()
            };
        }
    }
}
