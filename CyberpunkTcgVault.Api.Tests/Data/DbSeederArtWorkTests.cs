using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.Tests.TestHelpers;

namespace CyberpunkTcgVault.Api.Tests.Data
{
    public class DbSeederArtworkTests
    {
        [Fact]
        public void SeededCards_WhenImageUrlExists_HaveMatchingArtworkFile()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            DbSeeder.Seed(context);

            var repositoryRoot = FindRepositoryRoot();

            var apiRoot = Path.Combine(
                repositoryRoot,
                "CyberpunkTcgVault.Api");

            // Act
            var missingArtwork = context.CardPrintings
                .Where(printing =>
                    !string.IsNullOrWhiteSpace(printing.ImageUrl))
                .Select(printing => new
                {
                    CardName = printing.Card.Name,
                    printing.ImageUrl
                })
                .AsEnumerable()
                .Select(printing => new
                {
                    printing.CardName,
                    printing.ImageUrl,
                    FilePath = ResolveArtworkPath(
                        apiRoot,
                        printing.ImageUrl!)
                })
                .Where(printing => !File.Exists(printing.FilePath))
                .ToList();

            // Assert
            Assert.True(
                missingArtwork.Count == 0,
                "Seeded cards reference missing artwork:\n" +
                string.Join(
                    Environment.NewLine,
                    missingArtwork.Select(printing =>
                        $"- {printing.CardName}: {printing.ImageUrl}")));
        }

        private static string ResolveArtworkPath(
            string apiRoot,
            string imageUrl)
        {
            var relativePath = imageUrl
                .TrimStart('/')
                .Replace('/', Path.DirectorySeparatorChar);

            return Path.Combine(
                apiRoot,
                "wwwroot",
                relativePath);
        }

        private static string FindRepositoryRoot()
        {
            var directory = new DirectoryInfo(AppContext.BaseDirectory);

            while (directory != null)
            {
                var solutionPath = Path.Combine(
                    directory.FullName,
                    "CyberpunkTcgVault.sln");

                if (File.Exists(solutionPath))
                {
                    return directory.FullName;
                }

                directory = directory.Parent;
            }

            throw new DirectoryNotFoundException("Could not locate CyberpunkTcgVault.sln from the test output directory.");
        }
    }
}
