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

            // Identity's default EmailIndex is non-unique. Public
            // registration requires one account per normalized email, so the
            // database is the final concurrency guard if two registrations
            // race past UserManager's friendly duplicate check.
            builder.Entity<AppUser>()
                .HasIndex(user => user.NormalizedEmail)
                .HasDatabaseName("EmailIndex")
                .IsUnique()
                .HasFilter("[NormalizedEmail] IS NOT NULL");

            // Keep catalogue text columns bounded so exact-match filters can
            // use ordinary SQL Server indexes rather than nvarchar(max) scans.
            builder.Entity<Card>()
                .Property(card => card.Name)
                .HasMaxLength(200)
                .IsRequired();

            builder.Entity<Card>()
                .Property(card => card.Colour)
                .HasMaxLength(50);

            builder.Entity<Card>()
                .Property(card => card.CardType)
                .HasMaxLength(50);

            builder.Entity<Card>()
                .Property(card => card.Classification)
                .HasMaxLength(100);

            builder.Entity<Card>()
                .Property(card => card.Keywords)
                .HasMaxLength(250);

            builder.Entity<Card>()
                .Property(card => card.Notes)
                .HasMaxLength(2000);

            // Targeted catalogue indexes only. Do not index every possible
            // filter blindly; these support the common exact string filters
            // and printing-level set/rarity lookup paths.
            builder.Entity<Card>()
                .HasIndex(card => card.Name);

            builder.Entity<Card>()
                .HasIndex(card => card.Colour);

            builder.Entity<Card>()
                .HasIndex(card => card.CardType);

            builder.Entity<Card>()
                .HasIndex(card => card.Classification);

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

            builder.Entity<CardSet>()
                .HasIndex(cardSet => cardSet.Code);

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

            builder.Entity<CardPrinting>()
                .HasIndex(cardPrinting => cardPrinting.Rarity);

            builder.Entity<CardPrinting>()
                .HasIndex(cardPrinting => new
                {
                    cardPrinting.CardSetId,
                    cardPrinting.Rarity,
                    cardPrinting.CardId
                });

            builder.Entity<CardPrinting>()
                .HasIndex(cardPrinting => new
                {
                    cardPrinting.CardSetId,
                    cardPrinting.CardNumber,
                    cardPrinting.CardId
                });

            builder.Entity<OwnedCard>()
                .HasOne(ownedCard => ownedCard.CardPrinting)
                .WithMany(cardPrinting => cardPrinting.OwnedCards)
                .HasForeignKey(ownedCard => ownedCard.CardPrintingId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<OwnedCard>()
                .HasOne(ownedCard => ownedCard.User)
                .WithMany(user => user.OwnedCards)
                .HasForeignKey(ownedCard => ownedCard.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // A collector has one row per exact physical printing. QuantityOwned
            // represents multiple copies and the unique index is the final
            // concurrency guard against duplicate rows.
            builder.Entity<OwnedCard>()
                .HasIndex(ownedCard => new
                {
                    ownedCard.UserId,
                    ownedCard.CardPrintingId
                })
                .IsUnique();

            builder.Entity<WishListItem>()
                .HasOne(wishListItem => wishListItem.CardPrinting)
                .WithMany(cardPrinting => cardPrinting.WishListItems)
                .HasForeignKey(wishListItem => wishListItem.CardPrintingId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<WishListItem>()
                .HasOne(wishListItem => wishListItem.User)
                .WithMany(user => user.WishListItems)
                .HasForeignKey(wishListItem => wishListItem.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<CollectionProduct>()
                .HasOne(product => product.User)
                .WithMany(user => user.CollectionProducts)
                .HasForeignKey(product => product.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<WishListItem>()
                .HasIndex(wishListItem => new
                {
                    wishListItem.UserId,
                    wishListItem.CardPrintingId
                })
                .IsUnique();

            builder.Entity<CollectionProduct>()
                .Property(cp => cp.PurchaseCost)
                .HasPrecision(18, 2);

            builder.Entity<CollectionProduct>()
                .Property(cp => cp.ShippingCost)
                .HasPrecision(18, 2);

            builder.Entity<CollectionProduct>()
                .Property(cp => cp.VatCost)
                .HasPrecision(18, 2);

            builder.Entity<CollectionProduct>()
                .Property(cp => cp.EstimatedValue)
                .HasPrecision(18, 2);

            builder.Entity<CollectionProduct>()
                .Property(cp => cp.MinimumSellPrice)
                .HasPrecision(18, 2);
        }

    }
}
