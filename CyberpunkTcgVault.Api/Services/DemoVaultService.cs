using System.Data;
using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Security;
using CyberpunkTcgVault.Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CyberpunkTcgVault.Api.Services
{
    public class DemoVaultService : IDemoVaultService
    {
        private readonly AppDbContext _context;
        private readonly ILogger<DemoVaultService> _logger;

        public DemoVaultService(
            AppDbContext context,
            ILogger<DemoVaultService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task ResetDemoCollectorDataAsync(
            Guid userId,
            CancellationToken cancellationToken = default)
        {
            // Serializable isolation prevents two simultaneous Demo logins in
            // one database from interleaving delete/insert reset operations.
            await using var transaction = await _context.Database
                .BeginTransactionAsync(
                    IsolationLevel.Serializable,
                    cancellationToken);

            var printings = await _context.CardPrintings
                .AsNoTracking()
                .OrderBy(printing => printing.Id)
                .Take(8)
                .ToListAsync(cancellationToken);

            if (printings.Count < 6)
            {
                throw new InvalidOperationException(
                    "Demo Vault requires at least six card printings in the shared catalogue.");
            }

            // ExecuteDelete keeps reset cost proportional to SQL DELETEs and
            // avoids materialising every previous Demo row into memory.
            await _context.OwnedCards
                .Where(card => card.UserId == userId)
                .ExecuteDeleteAsync(cancellationToken);

            await _context.WishList
                .Where(item => item.UserId == userId)
                .ExecuteDeleteAsync(cancellationToken);

            await _context.Products
                .Where(product => product.UserId == userId)
                .ExecuteDeleteAsync(cancellationToken);

            var ownedCards = printings
                .Take(4)
                .Select((printing, index) => new OwnedCard
                {
                    UserId = userId,
                    CardPrintingId = printing.Id,
                    QuantityOwned = index == 0 ? 2 : 1,
                    Condition = "Near Mint",
                    IsInMasterCollection = true,
                    IsDuplicate = index == 0,
                    IsOpenForTrade = index == 0,
                    Notes = index == 0
                        ? "Demo collector record."
                        : null
                })
                .ToList();

            _context.OwnedCards.AddRange(ownedCards);

            foreach (var printing in printings.Skip(4).Take(2))
            {
                _context.WishList.Add(new WishListItem
                {
                    UserId = userId,
                    CardPrintingId = printing.Id,
                    WantedQuantity = 1,
                    Priority = "High",
                    ReasonWanted = "Demo current chase",
                    WantRaw = true
                });
            }

            _context.Products.AddRange(
                new CollectionProduct
                {
                    UserId = userId,
                    ProductName = "Night City Legend Display",
                    ProductType = "Booster Display",
                    Edition = "Demo",
                    Quantity = 2,
                    IsSealed = true,
                    IsKickstarterProduct = true,
                    Notes = "Demo showcase product."
                },
                new CollectionProduct
                {
                    UserId = userId,
                    ProductName = "The Heist Starter Deck",
                    ProductType = "Starter Deck",
                    Edition = "Demo",
                    Quantity = 1,
                    IsSealed = true,
                    Notes = "Demo showcase product."
                });

            await _context.SaveChangesAsync(cancellationToken);
            await transaction.CommitAsync(cancellationToken);

            _logger.LogInformation(
                SecurityLogEvents.DemoVaultReset,
                "Demo Vault collector data reset to the known baseline for Demo user {UserId}.",
                userId);
        }
    }
}
