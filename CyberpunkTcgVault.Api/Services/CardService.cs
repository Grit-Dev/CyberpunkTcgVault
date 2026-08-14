using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Services.Interfaces;
using CyberpunkTcgVault.Api.Services.Results;
using Microsoft.EntityFrameworkCore;

namespace CyberpunkTcgVault.Api.Services
{
    public class CardService : ICardService
    {
        private readonly AppDbContext _context;
        private readonly ILogger<CardService> _logger;

        public CardService(
            AppDbContext context,
            ILogger<CardService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IReadOnlyList<CardResponse>> GetCardsAsync(
            string? name,
            string? rarity,
            string? classification,
            string? cardType,
            CancellationToken cancellationToken)
        {
            var query = _context.Cards
                .AsNoTracking()
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(name))
            {
                query = query.Where(card => card.Name.Contains(name));
            }

            if (!string.IsNullOrWhiteSpace(rarity))
            {
                query = query.Where(card =>
                    card.CardPrintings.Any(printing =>
                        printing.Rarity == rarity));
            }

            if (!string.IsNullOrWhiteSpace(classification))
            {
                query = query.Where(card =>
                    card.Classification == classification);
            }

            if (!string.IsNullOrWhiteSpace(cardType))
            {
                query = query.Where(card =>
                    card.CardType == cardType);
            }

            var cards = await ProjectCards(query)
                .OrderBy(card => card.Name)
                .ToListAsync(cancellationToken);

            _logger.LogInformation(
                "Retrieved {Count} cards from the database.",
                cards.Count);

            return cards;
        }

        public async Task<CardResponse?> GetCardByIdAsync(
            int id,
            CancellationToken cancellationToken)
        {
            return await ProjectCards(
                    _context.Cards
                        .AsNoTracking()
                        .Where(card => card.Id == id))
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<CardResponse> CreateCardAsync(
            CreateCardRequest request,
            CancellationToken cancellationToken)
        {
            var card = new Card
            {
                Name = request.Name.Trim(),
                Colour = request.Colour?.Trim(),
                CardType = request.CardType?.Trim(),
                Classification = request.Classification?.Trim(),
                Keywords = request.Keywords?.Trim(),
                Cost = request.Cost,
                Power = request.Power,
                RamCost = request.RamCost,
                IsLegend = request.IsLegend,
                Notes = request.Notes?.Trim()
            };

            var hasSetName =
                !string.IsNullOrWhiteSpace(request.SetName);

            var hasCardNumber =
                !string.IsNullOrWhiteSpace(request.CardNumber);

            if (hasSetName && hasCardNumber)
            {
                var setName = request.SetName!.Trim();

                var cardSet = await GetOrCreateCardSetAsync(
                    setName,
                    cancellationToken);

                card.CardPrintings.Add(new CardPrinting
                {
                    CardSet = cardSet,
                    CardNumber = request.CardNumber!.Trim(),
                    Rarity = request.Rarity?.Trim(),
                    ImageUrl = request.ImageUrl?.Trim(),
                    LanguageCode = "en",
                    HasBetaSymbol = request.HasBetaSymbol,
                    IsKickstarterVersion =
                        request.IsKickstarterVersion,
                    IsRetailVersion = request.IsRetailVersion,
                    IsFoil = request.IsFoil,
                    IsAltArt = request.IsAltArt,
                    IsBoxTopper = request.IsBoxTopper,
                    IsPromo = request.IsPromo,
                    IsStarterDeckExclusive =
                        request.IsStarterDeckExclusive
                });
            }

            _context.Cards.Add(card);
            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation(
                "Card with ID {CardId} created successfully.",
                card.Id);

            return await ProjectCards(
                    _context.Cards
                        .AsNoTracking()
                        .Where(existingCard =>
                            existingCard.Id == card.Id))
                .FirstAsync(cancellationToken);
        }

        public async Task<CardUpdateResult> UpdateCardAsync(
            int id,
            UpdateCardRequest request,
            CancellationToken cancellationToken)
        {
            var card = await _context.Cards
                .Include(card => card.CardPrintings)
                    .ThenInclude(printing => printing.CardSet)
                .FirstOrDefaultAsync(
                    card => card.Id == id,
                    cancellationToken);

            if (card is null)
            {
                return CardUpdateResult.NotFound;
            }

            card.Name = request.Name.Trim();
            card.Colour = request.Colour?.Trim();
            card.CardType = request.CardType?.Trim();
            card.Classification = request.Classification?.Trim();
            card.Keywords = request.Keywords?.Trim();
            card.Cost = request.Cost;
            card.Power = request.Power;
            card.RamCost = request.RamCost;
            card.IsLegend = request.IsLegend;
            card.Notes = request.Notes?.Trim();

            CardPrinting? printing;

            if (request.CardPrintingId.HasValue)
            {
                printing = card.CardPrintings
                    .FirstOrDefault(cardPrinting =>
                        cardPrinting.Id ==
                        request.CardPrintingId.Value);

                if (printing is null)
                {
                    return CardUpdateResult.PrintingNotFound;
                }
            }
            else
            {
                printing = card.CardPrintings
                    .OrderBy(cardPrinting => cardPrinting.Id)
                    .FirstOrDefault();
            }

            if (printing is null)
            {
                var hasSetName =
                    !string.IsNullOrWhiteSpace(request.SetName);

                var hasCardNumber =
                    !string.IsNullOrWhiteSpace(request.CardNumber);

                if (hasSetName != hasCardNumber)
                {
                    return CardUpdateResult.InvalidPrintingData;
                }

                if (hasSetName && hasCardNumber)
                {
                    var cardSet = await GetOrCreateCardSetAsync(
                        request.SetName!.Trim(),
                        cancellationToken);

                    printing = new CardPrinting
                    {
                        CardSet = cardSet,
                        CardNumber = request.CardNumber!.Trim(),
                        LanguageCode = "en"
                    };

                    card.CardPrintings.Add(printing);
                }
            }

            if (printing is not null)
            {
                if (!string.IsNullOrWhiteSpace(request.SetName))
                {
                    var setName = request.SetName.Trim();

                    if (!string.Equals(
                            printing.CardSet.Name,
                            setName,
                            StringComparison.OrdinalIgnoreCase))
                    {
                        printing.CardSet =
                            await GetOrCreateCardSetAsync(
                                setName,
                                cancellationToken);
                    }
                }

                if (!string.IsNullOrWhiteSpace(request.CardNumber))
                {
                    printing.CardNumber =
                        request.CardNumber.Trim();
                }

                printing.Rarity = request.Rarity?.Trim();
                printing.ImageUrl = request.ImageUrl?.Trim();
                printing.HasBetaSymbol = request.HasBetaSymbol;
                printing.IsKickstarterVersion =
                    request.IsKickstarterVersion;
                printing.IsRetailVersion =
                    request.IsRetailVersion;
                printing.IsFoil = request.IsFoil;
                printing.IsAltArt = request.IsAltArt;
                printing.IsBoxTopper = request.IsBoxTopper;
                printing.IsPromo = request.IsPromo;
                printing.IsStarterDeckExclusive =
                    request.IsStarterDeckExclusive;
            }

            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation(
                "Card with ID {CardId} updated successfully.",
                id);

            return CardUpdateResult.Success;
        }

        public async Task<CardDeleteResult> DeleteCardAsync(
            int id,
            CancellationToken cancellationToken)
        {
            var card = await _context.Cards
                .Include(card => card.CardPrintings)
                .FirstOrDefaultAsync(
                    card => card.Id == id,
                    cancellationToken);

            if (card is null)
            {
                return CardDeleteResult.NotFound;
            }

            var printingIds = card.CardPrintings
                .Select(printing => printing.Id)
                .ToList();

            if (printingIds.Count > 0)
            {
                var isReferencedByCollectorData =
                    await _context.OwnedCards.AnyAsync(
                        ownedCard =>
                            printingIds.Contains(
                                ownedCard.CardPrintingId),
                        cancellationToken)
                    ||
                    await _context.WishList.AnyAsync(
                        wishListItem =>
                            printingIds.Contains(
                                wishListItem.CardPrintingId),
                        cancellationToken);

                if (isReferencedByCollectorData)
                {
                    return CardDeleteResult.ReferencedByCollectorData;
                }

                _context.CardPrintings.RemoveRange(
                    card.CardPrintings);
            }

            _context.Cards.Remove(card);
            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation(
                "Card with ID {CardId} deleted successfully.",
                id);

            return CardDeleteResult.Success;
        }

        private async Task<CardSet> GetOrCreateCardSetAsync(
            string setName,
            CancellationToken cancellationToken)
        {
            var cardSet = await _context.CardSets
                .FirstOrDefaultAsync(
                    cardSet => cardSet.Name == setName,
                    cancellationToken);

            return cardSet ?? new CardSet
            {
                Name = setName
            };
        }

        private static IQueryable<CardResponse> ProjectCards(
            IQueryable<Card> query)
        {
            return query.Select(card => new CardResponse
            {
                Id = card.Id,
                Name = card.Name,
                Colour = card.Colour,
                CardType = card.CardType,
                Classification = card.Classification,
                Keywords = card.Keywords,
                Cost = card.Cost,
                Power = card.Power,
                RamCost = card.RamCost,
                IsLegend = card.IsLegend,
                Notes = card.Notes,

                CardPrintingId = card.CardPrintings
                    .OrderBy(printing => printing.Id)
                    .Select(printing => (int?)printing.Id)
                    .FirstOrDefault(),

                SetName = card.CardPrintings
                    .OrderBy(printing => printing.Id)
                    .Select(printing => printing.CardSet.Name)
                    .FirstOrDefault(),

                Rarity = card.CardPrintings
                    .OrderBy(printing => printing.Id)
                    .Select(printing => printing.Rarity)
                    .FirstOrDefault(),

                HasBetaSymbol = card.CardPrintings
                    .OrderBy(printing => printing.Id)
                    .Select(printing =>
                        (bool?)printing.HasBetaSymbol)
                    .FirstOrDefault() ?? false,

                IsKickstarterVersion = card.CardPrintings
                    .OrderBy(printing => printing.Id)
                    .Select(printing =>
                        (bool?)printing.IsKickstarterVersion)
                    .FirstOrDefault() ?? false,

                IsRetailVersion = card.CardPrintings
                    .OrderBy(printing => printing.Id)
                    .Select(printing =>
                        (bool?)printing.IsRetailVersion)
                    .FirstOrDefault() ?? false,

                IsFoil = card.CardPrintings
                    .OrderBy(printing => printing.Id)
                    .Select(printing =>
                        (bool?)printing.IsFoil)
                    .FirstOrDefault() ?? false,

                IsAltArt = card.CardPrintings
                    .OrderBy(printing => printing.Id)
                    .Select(printing =>
                        (bool?)printing.IsAltArt)
                    .FirstOrDefault() ?? false,

                IsBoxTopper = card.CardPrintings
                    .OrderBy(printing => printing.Id)
                    .Select(printing =>
                        (bool?)printing.IsBoxTopper)
                    .FirstOrDefault() ?? false,

                IsPromo = card.CardPrintings
                    .OrderBy(printing => printing.Id)
                    .Select(printing =>
                        (bool?)printing.IsPromo)
                    .FirstOrDefault() ?? false,

                IsStarterDeckExclusive = card.CardPrintings
                    .OrderBy(printing => printing.Id)
                    .Select(printing =>
                        (bool?)printing.IsStarterDeckExclusive)
                    .FirstOrDefault() ?? false,

                CardNumber = card.CardPrintings
                    .OrderBy(printing => printing.Id)
                    .Select(printing => printing.CardNumber)
                    .FirstOrDefault(),

                ImageUrl = card.CardPrintings
                    .OrderBy(printing => printing.Id)
                    .Select(printing => printing.ImageUrl)
                    .FirstOrDefault(),

                Printings = card.CardPrintings
                    .OrderBy(printing => printing.Id)
                    .Select(printing =>
                        new CardPrintingResponse
                        {
                            Id = printing.Id,
                            CardSetId = printing.CardSetId,
                            SetName = printing.CardSet.Name,
                            SetCode = printing.CardSet.Code,
                            CardNumber = printing.CardNumber,
                            Rarity = printing.Rarity,
                            ImageUrl = printing.ImageUrl,
                            LanguageCode = printing.LanguageCode,
                            HasBetaSymbol =
                                printing.HasBetaSymbol,
                            IsKickstarterVersion =
                                printing.IsKickstarterVersion,
                            IsRetailVersion =
                                printing.IsRetailVersion,
                            IsFoil = printing.IsFoil,
                            IsAltArt = printing.IsAltArt,
                            IsBoxTopper = printing.IsBoxTopper,
                            IsPromo = printing.IsPromo,
                            IsStarterDeckExclusive =
                                printing.IsStarterDeckExclusive
                        })
                    .ToList()
            });
        }
    }
}
