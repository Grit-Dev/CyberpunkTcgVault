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
            var missingArtwork = context.Cards
                .Where(card => !string.IsNullOrWhiteSpace(card.ImageUrl))
                .AsEnumerable()
                .Select(card => new
                {
                    card.Name,
                    card.ImageUrl,
                    FilePath = ResolveArtworkPath(
                        apiRoot,
                        card.ImageUrl!)
                })
                .Where(card => !File.Exists(card.FilePath))
                .ToList();

            // Assert
            Assert.True(
                missingArtwork.Count == 0,
                "Seeded cards reference missing artwork:\n" +
                string.Join(
                    Environment.NewLine,
                    missingArtwork.Select(card =>
                        $"- {card.Name}: {card.ImageUrl}")));
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
