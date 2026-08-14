using CyberpunkTcgVault.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CyberpunkTcgVault.Api.Data
{
    public class AppDbContext : IdentityDbContext<AppUser, IdentityRole<Guid>, Guid>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Card> Cards { get; set; }

        public DbSet<OwnedCard> OwnedCards { get; set; }

        public DbSet<CollectionProduct> Products { get; set; }

        public DbSet<WishListItem> WishList { get; set; }

        public DbSet<CardSet> CardSets { get; set; }

        public DbSet<CardPrinting> CardPrintings { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
                .ToTable("Users");

            // One Card can have many physical printings.
            builder.Entity<CardPrinting>()
                .HasOne(cardPrinting => cardPrinting.Card)
                .WithMany(card => card.CardPrintings)
                .HasForeignKey(cardPrinting => cardPrinting.CardId)
                .OnDelete(DeleteBehavior.Restrict);

            // One CardSet can contain many physical printings.
            builder.Entity<CardPrinting>()
                .HasOne(cardPrinting => cardPrinting.CardSet)
                .WithMany(cardSet => cardSet.CardPrintings)
                .HasForeignKey(cardPrinting => cardPrinting.CardSetId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<CardSet>()
                .Property(cardSet => cardSet.Name)
                .HasMaxLength(150)
                .IsRequired();

            builder.Entity<CardSet>()
                .Property(cardSet => cardSet.Code)
                .HasMaxLength(50);

            builder.Entity<CardPrinting>()
                .Property(cardPrinting => cardPrinting.CardNumber)
                .HasMaxLength(50)
                .IsRequired();

            builder.Entity<CardPrinting>()
                .Property(cardPrinting => cardPrinting.Rarity)
                .HasMaxLength(50);

            builder.Entity<CardPrinting>()
                .Property(cardPrinting => cardPrinting.ImageUrl)
                .HasMaxLength(500);

            builder.Entity<CardPrinting>()
                .Property(cardPrinting => cardPrinting.LanguageCode)
                .HasMaxLength(10);

            builder.Entity<OwnedCard>()
                .HasOne(ownedCard => ownedCard.CardPrinting)
                .WithMany(cardPrinting => cardPrinting.OwnedCards)
                .HasForeignKey(ownedCard => ownedCard.CardPrintingId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<WishListItem>()
                .HasOne(wishListItem => wishListItem.CardPrinting)
                .WithMany(cardPrinting => cardPrinting.WishListItems)
                .HasForeignKey(wishListItem => wishListItem.CardPrintingId)
                .OnDelete(DeleteBehavior.Restrict);
        }

    }
}
