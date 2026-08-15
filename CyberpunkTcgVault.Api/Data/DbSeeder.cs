using CyberpunkTcgVault.Api.Models;

// Developer note:
// Placeholder artwork filenames are generated from the seeded card name.
// If artwork filenames change, update BuildImageUrl too.

namespace CyberpunkTcgVault.Api.Data
{
    public static class DbSeeder
    {
        private const string SeedSetName = "Choom Vault Origins";
        private const string SeedSetCode = "CVO";

        public static void Seed(AppDbContext context)
        {
            SeedCards(context);
            SeedCardPrintings(context);
        }

        private static void SeedCards(AppDbContext context)
        {
            var seedCards = CreateSeedCards();
            var seedNames = seedCards
                .Select(card => card.Name)
                .ToList();

            var existingNames = context.Cards
                .Where(card => seedNames.Contains(card.Name))
                .Select(card => card.Name)
                .ToHashSet(StringComparer.OrdinalIgnoreCase);

            var missingCards = seedCards
                .Where(card => !existingNames.Contains(card.Name))
                .ToList();

            if (missingCards.Count == 0)
            {
                return;
            }

            context.Cards.AddRange(missingCards);
            context.SaveChanges();
        }

        private static List<Card> CreateSeedCards()
        {
            return new List<Card>
            {
                new()
                {
                    Name = "Madam Zhu",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Malcolm Vereen",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Malvik The Red King Soro",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Midnight Ramen",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Neon Oracle",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Neon Revenant",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Neon Scavenger",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Noctis Specter",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Nyx Eclipse Korvex",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Old Spark",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Onryo Haze",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Orbital Drop",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "President Mateo Veridian",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Rez Shadow Runner Kozak",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Riot Shepherd",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Sable9",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Sable Echo Mori",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Scrap Oracle",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Senator Hana Ryugen",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Shogun",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Shogun Redfang",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Silcencer Hyoteki",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Solomon Grinder Vex",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Soul Mercenary",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Substrate Siren",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "The Archivist",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "The Chrome Market",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "The Corpo Sanctum",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "The Eclipse Casino",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "The Floating Market",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "The Ghost Merchant",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "The Last Broadcast",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "The White Wanderer",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Velvet Syndicate",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Velvet Syndicate Alt",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Nova Vale",
                    Colour = "Yellow",
                    CardType = "Character",
                    Classification = "Nomad",
                    Keywords = "Courier",
                    IsLegend = true,
                },
                new()
                {
                    Name = "Mara Velez",
                    Colour = "Yellow",
                    CardType = "Unit",
                    Classification = "Tech",
                    Keywords = "Medic",
                    Cost = 5,
                    Power = 6,
                    RamCost = 2,
                    IsLegend = false,
                },
                new()
                {
                    Name = "Viktor The Architect Malvek",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Visionary Of The Table",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Void Geisha",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Lucia Serrano Say It Again",
                    Colour = "Yellow",
                    CardType = "Character",
                    Classification = "Solo",
                },
                new()
                {
                    Name = "Zerotrace",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Ambassador Lira Voss",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Black Clinic Miracle",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Black Market Upgrade",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Blackstar",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Blackwire Sato Female",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Blackwire Sato Male",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Catheoral Virus",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Chairwoman Isadora Quell",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Chrome Ronin",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Councilor Lysander Vale",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Data Ghost",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Detective Kai Mori",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Doc Marquez",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Dr Synapse",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Dr Vesper Kao",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Ghost Breach",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Ghost Slice",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Iron Cordon",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Ironteeth",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Ironworld Kashta",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Kai Blackwire Sato",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Kai Spark Tanaka",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Katana Xr7 Hoverbike",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Kitsune Nocturne",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Kojin The Exile",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Lunar Bazaar",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
                new()
                {
                    Name = "Madam Echo",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                },
            };
        }

        private static void SeedCardPrintings(AppDbContext context)
        {
            var cardSet = context.CardSets
                .FirstOrDefault(cardSet =>
                    cardSet.Name == SeedSetName);

            if (cardSet is null)
            {
                cardSet = new CardSet
                {
                    Name = SeedSetName,
                    Code = SeedSetCode
                };

                context.CardSets.Add(cardSet);
                context.SaveChanges();
            }

            var seedDefinitions = CreateSeedCards();
            var seedNames = seedDefinitions
                .Select(card => card.Name)
                .ToList();

            var cardsByName = context.Cards
                .Where(card => seedNames.Contains(card.Name))
                .ToDictionary(
                    card => card.Name,
                    StringComparer.OrdinalIgnoreCase);

            var existingPrintingCardIds = context.CardPrintings
                .Where(printing =>
                    printing.CardSetId == cardSet.Id)
                .Select(printing => printing.CardId)
                .ToHashSet();

            var cardPrintings = new List<CardPrinting>();

            for (var index = 0;
                 index < seedDefinitions.Count;
                 index++)
            {
                var seedDefinition = seedDefinitions[index];

                if (!cardsByName.TryGetValue(
                        seedDefinition.Name,
                        out var card))
                {
                    continue;
                }

                if (existingPrintingCardIds.Contains(card.Id))
                {
                    continue;
                }

                var cardPrinting = new CardPrinting
                {
                    CardId = card.Id,
                    CardSetId = cardSet.Id,
                    CardNumber =
                        $"{SeedSetCode}-{index + 1:000}",
                    Rarity = BuildRarity(card.Name),
                    ImageUrl = BuildImageUrl(card.Name),
                    LanguageCode = "en"
                };

                cardPrintings.Add(cardPrinting);
            }

            if (cardPrintings.Count == 0)
            {
                return;
            }

            context.CardPrintings.AddRange(cardPrintings);
            context.SaveChanges();
        }

        private static string BuildRarity(string cardName)
        {
            return cardName switch
            {
                "Nova Vale" => "Iconic",
                "Mara Velez" => "Prototype",
                _ => "Unknown"
            };
        }

        private static string BuildImageUrl(string cardName)
        {
            var fileName = cardName
                .Trim()
                .ToLowerInvariant()
                .Replace(" ", "-");

            return $"/images/cards/{fileName}.png";
        }
    }
}
