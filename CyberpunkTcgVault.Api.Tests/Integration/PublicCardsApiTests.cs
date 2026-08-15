using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System.Net;

namespace CyberpunkTcgVault.Api.Tests.Integration
{
    public class PublicCardsApiTests
    {
        [Fact]
        public async Task GetCards_WhenAnonymous_ReturnsOk()
        {
            await using var factory = new PublicCardsWebApplicationFactory();

            using var scope = factory.Services.CreateScope();

            var context =
                scope.ServiceProvider.GetRequiredService<AppDbContext>();

            var card = new Card
            {
                Name = "Public Test Card",
                Colour = "Yellow",
                CardType = "Character"
            };

            card.CardPrintings.Add(new CardPrinting
            {
                CardSet = new CardSet
                {
                    Name = "Night City Legends",
                    Code = "NCL"
                },
                CardNumber = "NCL-001",
                Rarity = "Rare",
                LanguageCode = "en"
            });

            context.Cards.Add(card);
            await context.SaveChangesAsync();

            var client = factory.CreateClient(
                new WebApplicationFactoryClientOptions
                {
                    BaseAddress = new Uri("https://localhost"),
                    AllowAutoRedirect = false
                });

            var response =
                await client.GetAsync("/api/Cards");

            Assert.Equal(
                HttpStatusCode.OK,
                response.StatusCode);
        }

        [Fact]
        public async Task GetFilterOptions_WhenAnonymous_ReturnsOk()
        {
            await using var factory =
                new PublicCardsWebApplicationFactory();

            var client = factory.CreateClient(
                new WebApplicationFactoryClientOptions
                {
                    BaseAddress = new Uri("https://localhost"),
                    AllowAutoRedirect = false
                });

            var response =
                await client.GetAsync(
                    "/api/Cards/filter-options");

            Assert.Equal(
                HttpStatusCode.OK,
                response.StatusCode);
        }

        private sealed class PublicCardsWebApplicationFactory
            : WebApplicationFactory<Program>
        {
            private readonly string _databaseName =
                $"public-cards-{Guid.NewGuid()}";

            protected override void ConfigureWebHost(
                IWebHostBuilder builder)
            {
                builder.UseEnvironment("Testing");

                builder.ConfigureTestServices(services =>
                {
                    // Remove the production AppDbContext and, importantly,
                    // its SQL Server options configuration before adding
                    // the test database provider.
                    services.RemoveAll<AppDbContext>();

                    services.RemoveAll<
                        DbContextOptions<AppDbContext>>();

                    services.RemoveAll<
                        IDbContextOptionsConfiguration<AppDbContext>>();

                    services.AddDbContext<AppDbContext>(
                        options =>
                            options.UseInMemoryDatabase(
                                _databaseName));
                });
            }
        }
    }
}