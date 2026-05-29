using CyberpunkTcgVault.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CyberpunkTcgVault.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
            //PMG TODO: Db provider to be configured and connection string being used. 
        }

        public DbSet<Card> Cards { get; set; }

        public DbSet<OwnedCard> OwnedCards { get; set; }

        public DbSet<CollectionProduct> Products { get; set; }
    }
}
