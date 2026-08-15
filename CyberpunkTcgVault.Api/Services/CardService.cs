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
            CardCatalogueQuery filters,
            CancellationToken cancellationToken)
        {
            var query = BuildCatalogueQuery(filters);
            var orderedQuery = ApplySorting(query, filters);

            var cards = await ProjectCards(orderedQuery)
                .ToListAsync(cancellationToken);

            _logger.LogInformation(
                "Retrieved {Count} catalogue cards.",
                cards.Count);

            return cards;
        }

        public async Task<PagedResponse<CardResponse>> GetCardsPageAsync(
            CardCatalogueQuery filters,
            int page,
            int pageSize,
            CancellationToken cancellationToken)
        {
            var query = BuildCatalogueQuery(filters);
            var totalCount = await query.CountAsync(cancellationToken);
            var orderedQuery = ApplySorting(query, filters);
            var skip = (page - 1) * pageSize;

            var items = await ProjectCards(orderedQuery)
                .Skip(skip)
                .Take(pageSize)
                .ToListAsync(cancellationToken);

            return new PagedResponse<CardResponse>
            {
                Items = items,
                Page = page,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = totalCount == 0
                    ? 0
                    : (int)Math.Ceiling(totalCount / (double)pageSize)
            };
        }

        public async Task<CardFilterOptionsResponse> GetFilterOptionsAsync(
            CancellationToken cancellationToken)
        {
            // Keep the inexpensive scalar distinct work in SQL. Tags are the
            // only exception because the current MVP stores them in the
            // compatibility Keywords string rather than a normalized tag table.
            var colours = await _context.Cards
                .AsNoTracking()
                .Where(card => card.Colour != null && card.Colour != "")
                .Select(card => card.Colour!)
                .Distinct()
                .ToListAsync(cancellationToken);

            var cardTypes = await _context.Cards
                .AsNoTracking()
                .Where(card => card.CardType != null && card.CardType != "")
                .Select(card => card.CardType!)
                .Distinct()
                .ToListAsync(cancellationToken);

            var keywordValues = await _context.Cards
                .AsNoTracking()
                .Where(card => card.Keywords != null && card.Keywords != "")
                .Select(card => card.Keywords!)
                .Distinct()
                .ToListAsync(cancellationToken);

            var costs = await _context.Cards
                .AsNoTracking()
                .Where(card => card.Cost.HasValue)
                .Select(card => card.Cost!.Value)
                .Distinct()
                .OrderBy(value => value)
                .ToListAsync(cancellationToken);

            var powers = await _context.Cards
                .AsNoTracking()
                .Where(card => card.Power.HasValue)
                .Select(card => card.Power!.Value)
                .Distinct()
                .OrderBy(value => value)
                .ToListAsync(cancellationToken);

            var ramValues = await _context.Cards
                .AsNoTracking()
                .Where(card => card.RamCost.HasValue)
                .Select(card => card.RamCost!.Value)
                .Distinct()
                .OrderBy(value => value)
                .ToListAsync(cancellationToken);

            var eddiesValues = await _context.Cards
                .AsNoTracking()
                .Where(card => card.Eddies.HasValue)
                .Select(card => card.Eddies!.Value)
                .Distinct()
                .OrderBy(value => value)
                .ToListAsync(cancellationToken);

            var sets = await _context.CardPrintings
                .AsNoTracking()
                .Where(printing =>
                    printing.CardSet.Code != null &&
                    printing.CardSet.Code != "")
                .Select(printing => new
                {
                    Code = printing.CardSet.Code!,
                    printing.CardSet.Name
                })
                .Distinct()
                .OrderBy(set => set.Code)
                .ThenBy(set => set.Name)
                .ToListAsync(cancellationToken);

            var rarities = await _context.CardPrintings
                .AsNoTracking()
                .Where(printing =>
                    printing.Rarity != null &&
                    printing.Rarity != "")
                .Select(printing => printing.Rarity!)
                .Distinct()
                .ToListAsync(cancellationToken);

            return new CardFilterOptionsResponse
            {
                Colours = NormalizeDistinctStrings(colours),
                CardTypes = NormalizeDistinctStrings(cardTypes),
                Tags = ParseDistinctTags(keywordValues),
                Costs = costs,
                Powers = powers,
                RamValues = ramValues,
                EddiesValues = eddiesValues,
                Sets = sets
                    .Select(set => new CardSetFilterOptionResponse
                    {
                        Code = set.Code.Trim(),
                        Name = set.Name.Trim()
                    })
                    .Where(set =>
                        !set.Code.Equals(
                            "Unknown",
                            StringComparison.OrdinalIgnoreCase) &&
                        !set.Name.Equals(
                            "Unknown",
                            StringComparison.OrdinalIgnoreCase))
                    .GroupBy(
                        set => set.Code,
                        StringComparer.OrdinalIgnoreCase)
                    .Select(group => group
                        .OrderBy(set => set.Name, StringComparer.OrdinalIgnoreCase)
                        .First())
                    .OrderBy(set => set.Code, StringComparer.OrdinalIgnoreCase)
                    .ThenBy(set => set.Name, StringComparer.OrdinalIgnoreCase)
                    .ToList(),
                Rarities = NormalizeDistinctStrings(rarities)
            };
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
                Eddies = request.Eddies,
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
            card.Eddies = request.Eddies;
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

        private IQueryable<Card> BuildCatalogueQuery(
            CardCatalogueQuery filters)
        {
            var query = _context.Cards
                .AsNoTracking()
                .AsQueryable();

            var name = NormalizeFilter(filters.Name);
            var colour = NormalizeFilter(filters.Colour);
            var cardType = NormalizeFilter(filters.EffectiveCardType);
            var classification = NormalizeFilter(filters.Classification);
            var tag = NormalizeFilter(filters.EffectiveTag);
            var setCode = NormalizeFilter(filters.SetCode);
            var rarity = NormalizeFilter(filters.Rarity);

            if (name is not null)
            {
                // Preserve the existing partial-name semantics. SQL Server's
                // configured collation determines case sensitivity without
                // wrapping the indexed column in ToLower/ToUpper.
                query = query.Where(card => card.Name.Contains(name));
            }

            if (colour is not null)
            {
                query = query.Where(card => card.Colour == colour);
            }

            if (cardType is not null)
            {
                query = query.Where(card => card.CardType == cardType);
            }

            if (classification is not null)
            {
                query = query.Where(card =>
                    card.Classification == classification);
            }

            if (tag is not null)
            {
                var tagToken = "," + tag + ",";

                // Keywords is the current compatibility storage for source
                // tags. Padding with delimiters prevents `Solo` matching
                // `Soloist`. Replace handles the common comma/semicolon forms
                // without loading Cards into memory.
                query = query.Where(card =>
                    card.Keywords != null &&
                    ("," + card.Keywords
                        .Replace(";", ",")
                        .Replace(", ", ",")
                        .Replace(" ,", ",") + ",")
                        .Contains(tagToken));
            }

            if (filters.Cost.HasValue)
            {
                query = query.Where(card => card.Cost == filters.Cost.Value);
            }

            if (filters.Power.HasValue)
            {
                query = query.Where(card => card.Power == filters.Power.Value);
            }

            if (filters.Ram.HasValue)
            {
                query = query.Where(card =>
                    card.RamCost == filters.Ram.Value);
            }

            if (filters.Eddies.HasValue)
            {
                query = query.Where(card =>
                    card.Eddies == filters.Eddies.Value);
            }

            if (setCode is not null || rarity is not null)
            {
                // Printing-level filters intentionally live inside one Any.
                // This guarantees setCode + rarity are satisfied by the SAME
                // physical printing rather than two unrelated printings.
                query = query.Where(card =>
                    card.CardPrintings.Any(printing =>
                        (setCode == null || printing.CardSet.Code == setCode) &&
                        (rarity == null || printing.Rarity == rarity)));
            }

            return query;
        }

        private static IOrderedQueryable<Card> ApplySorting(
            IQueryable<Card> query,
            CardCatalogueQuery filters)
        {
            var sortBy = string.IsNullOrWhiteSpace(filters.SortBy)
                ? CardCatalogueSortOptions.SetOrder
                : filters.SortBy.Trim();

            var descending = string.Equals(
                filters.SortDirection,
                CardCatalogueSortOptions.Descending,
                StringComparison.OrdinalIgnoreCase);

            if (sortBy.Equals(
                    CardCatalogueSortOptions.Name,
                    StringComparison.OrdinalIgnoreCase))
            {
                return descending
                    ? query.OrderByDescending(card => card.Name)
                        .ThenByDescending(card => card.Id)
                    : query.OrderBy(card => card.Name)
                        .ThenBy(card => card.Id);
            }

            var setCode = NormalizeFilter(filters.SetCode);
            var rarity = NormalizeFilter(filters.Rarity);

            // The domain does not yet contain an authoritative source-provided
            // release-order field. `setOrder` therefore means a stable
            // server-owned order by set code, then card number, then card name
            // and ID. An approved provider can later supply a true set rank
            // without changing the public sortBy value.
            if (descending)
            {
                return query
                    .OrderByDescending(card => card.CardPrintings
                        .Where(printing =>
                            (setCode == null || printing.CardSet.Code == setCode) &&
                            (rarity == null || printing.Rarity == rarity))
                        .OrderBy(printing => printing.CardSet.Code)
                        .ThenBy(printing => printing.CardNumber)
                        .Select(printing =>
                            printing.CardSet.Code ?? printing.CardSet.Name)
                        .FirstOrDefault())
                    .ThenByDescending(card => card.CardPrintings
                        .Where(printing =>
                            (setCode == null || printing.CardSet.Code == setCode) &&
                            (rarity == null || printing.Rarity == rarity))
                        .OrderBy(printing => printing.CardSet.Code)
                        .ThenBy(printing => printing.CardNumber)
                        .Select(printing => printing.CardNumber)
                        .FirstOrDefault())
                    .ThenByDescending(card => card.Name)
                    .ThenByDescending(card => card.Id);
            }

            return query
                .OrderBy(card => card.CardPrintings
                    .Where(printing =>
                        (setCode == null || printing.CardSet.Code == setCode) &&
                        (rarity == null || printing.Rarity == rarity))
                    .OrderBy(printing => printing.CardSet.Code)
                    .ThenBy(printing => printing.CardNumber)
                    .Select(printing =>
                        printing.CardSet.Code ?? printing.CardSet.Name)
                    .FirstOrDefault())
                .ThenBy(card => card.CardPrintings
                    .Where(printing =>
                        (setCode == null || printing.CardSet.Code == setCode) &&
                        (rarity == null || printing.Rarity == rarity))
                    .OrderBy(printing => printing.CardSet.Code)
                    .ThenBy(printing => printing.CardNumber)
                    .Select(printing => printing.CardNumber)
                    .FirstOrDefault())
                .ThenBy(card => card.Name)
                .ThenBy(card => card.Id);
        }

        private static string? NormalizeFilter(string? value)
        {
            return string.IsNullOrWhiteSpace(value)
                ? null
                : value.Trim();
        }

        private static IReadOnlyList<string> NormalizeDistinctStrings(
            IEnumerable<string> values)
        {
            return values
                .Select(value => value.Trim())
                .Where(value =>
                    value.Length > 0 &&
                    !value.Equals(
                        "Unknown",
                        StringComparison.OrdinalIgnoreCase))
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .OrderBy(value => value, StringComparer.OrdinalIgnoreCase)
                .ToList();
        }

        private static IReadOnlyList<string> ParseDistinctTags(
            IEnumerable<string> keywordValues)
        {
            return keywordValues
                .SelectMany(value => value.Split(
                    [',', ';'],
                    StringSplitOptions.RemoveEmptyEntries |
                    StringSplitOptions.TrimEntries))
                .Where(tag =>
                    tag.Length > 0 &&
                    !tag.Equals(
                        "Unknown",
                        StringComparison.OrdinalIgnoreCase))
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .OrderBy(tag => tag, StringComparer.OrdinalIgnoreCase)
                .ToList();
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
                Eddies = card.Eddies,
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
