using CyberpunkTcgVault.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace CyberpunkTcgVault.Api.Tests.TestHelpers
{
    public static class TestDbContextFactory
    {
        public static AppDbContext Create()
        {
            // Create a new set of database options for the test AppDbContext.
            // These options tell EF Core to use an in-memory database instead of SQL Server.
            var options = new DbContextOptionsBuilder<AppDbContext>()

            // Give each test its own unique in-memory database.
            // This stops tests from sharing data with each other and affecting the results.
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

            // Return a new AppDbContext using the in-memory database options.
            // No real SQL Server data is touched.
            return new AppDbContext(options);
        }
    }
}
