using CyberpunkTcgVault.Api.Models;

// Developer note:
// ImageUrl must exactly match the filename inside:
// wwwroot/images/cards
//
// If artwork filenames change, update this value too.

namespace CyberpunkTcgVault.Api.Data
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext context)
        {
            SeedCards(context);
            SeedCardPrintings(context);
        }

        private static void SeedCards(AppDbContext context)
        {
            if (context.Cards.Any())
            {
                return;
            }

            var cards = new List<Card>
            {
                new()
                {
                    Name = "Madam Zhu",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-001",
                    ImageUrl = "/images/cards/madam-zhu.png",
                },
                new()
                {
                    Name = "Malcolm Vereen",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-002",
                    ImageUrl = "/images/cards/malcolm-vereen.png",
                },
                new()
                {
                    Name = "Malvik The Red King Soro",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-003",
                    ImageUrl = "/images/cards/malvik-the-red-king-soro.png",
                },
                new()
                {
                    Name = "Midnight Ramen",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-004",
                    ImageUrl = "/images/cards/midnight-ramen.png",
                },
                new()
                {
                    Name = "Neon Oracle",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-005",
                    ImageUrl = "/images/cards/neon-oracle.png",
                },
                new()
                {
                    Name = "Neon Revenant",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-006",
                    ImageUrl = "/images/cards/neon-revenant.png",
                },
                new()
                {
                    Name = "Neon Scavenger",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-007",
                    ImageUrl = "/images/cards/neon-scavenger.png",
                },
                new()
                {
                    Name = "Noctis Specter",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-008",
                    ImageUrl = "/images/cards/noctis-specter.png",
                },
                new()
                {
                    Name = "Nyx Eclipse Korvex",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-009",
                    ImageUrl = "/images/cards/nyx-eclipse-korvex.png",
                },
                new()
                {
                    Name = "Old Spark",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-010",
                    ImageUrl = "/images/cards/old-spark.png",
                },
                new()
                {
                    Name = "Onryo Haze",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-011",
                    ImageUrl = "/images/cards/onryo-haze.png",
                },
                new()
                {
                    Name = "Orbital Drop",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-012",
                    ImageUrl = "/images/cards/orbital-drop.png",
                },
                new()
                {
                    Name = "President Mateo Veridian",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-013",
                    ImageUrl = "/images/cards/president-mateo-veridian.png",
                },
                new()
                {
                    Name = "Rez Shadow Runner Kozak",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-014",
                    ImageUrl = "/images/cards/rez-shadow-runner-kozak.png",
                },
                new()
                {
                    Name = "Riot Shepherd",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-015",
                    ImageUrl = "/images/cards/riot-shepherd.png",
                },
                new()
                {
                    Name = "Sable9",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-016",
                    ImageUrl = "/images/cards/sable9.png",
                },
                new()
                {
                    Name = "Sable Echo Mori",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-017",
                    ImageUrl = "/images/cards/sable-echo-mori.png",
                },
                new()
                {
                    Name = "Scrap Oracle",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-018",
                    ImageUrl = "/images/cards/scrap-oracle.png",
                },
                new()
                {
                    Name = "Senator Hana Ryugen",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-019",
                    ImageUrl = "/images/cards/senator-hana-ryugen.png",
                },
                new()
                {
                    Name = "Shogun",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-020",
                    ImageUrl = "/images/cards/shogun.png",
                },
                new()
                {
                    Name = "Shogun Redfang",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-021",
                    ImageUrl = "/images/cards/shogun-redfang.png",
                },
                new()
                {
                    Name = "Silcencer Hyoteki",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-022",
                    ImageUrl = "/images/cards/silcencer-hyoteki.png",
                },
                new()
                {
                    Name = "Solomon Grinder Vex",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-023",
                    ImageUrl = "/images/cards/solomon-grinder-vex.png",
                },
                new()
                {
                    Name = "Soul Mercenary",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-024",
                    ImageUrl = "/images/cards/soul-mercenary.png",
                },
                new()
                {
                    Name = "Substrate Siren",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-025",
                    ImageUrl = "/images/cards/substrate-siren.png",
                },
                new()
                {
                    Name = "The Archivist",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-026",
                    ImageUrl = "/images/cards/the-archivist.png",
                },
                new()
                {
                    Name = "The Chrome Market",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-027",
                    ImageUrl = "/images/cards/the-chrome-market.png",
                },
                new()
                {
                    Name = "The Corpo Sanctum",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-028",
                    ImageUrl = "/images/cards/the-corpo-sanctum.png",
                },
                new()
                {
                    Name = "The Eclipse Casino",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-029",
                    ImageUrl = "/images/cards/the-eclipse-casino.png",
                },
                new()
                {
                    Name = "The Floating Market",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-030",
                    ImageUrl = "/images/cards/the-floating-market.png",
                },
                new()
                {
                    Name = "The Ghost Merchant",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-031",
                    ImageUrl = "/images/cards/the-ghost-merchant.png",
                },
                new()
                {
                    Name = "The Last Broadcast",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-032",
                    ImageUrl = "/images/cards/the-last-broadcast.png",
                },
                new()
                {
                    Name = "The White Wanderer",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-033",
                    ImageUrl = "/images/cards/the-white-wanderer.png",
                },
                new()
                {
                    Name = "Velvet Syndicate",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-034",
                    ImageUrl = "/images/cards/velvet-syndicate.png",
                },
                new()
                {
                    Name = "Velvet Syndicate Alt",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-035",
                    ImageUrl = "/images/cards/velvet-syndicate-alt.png",
                },
                new()
                {
                    Name = "V For Vendetta",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-036",
                    ImageUrl = "/images/cards/v-for-vendetta.png",
                },
                new()
                {
                    Name = "V For Vendetta Alt Rose",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-037",
                    ImageUrl = "/images/cards/v-for-vendetta-alt-rose.png",
                },
                new()
                {
                    Name = "Viktor The Architect Malvek",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-038",
                    ImageUrl = "/images/cards/viktor-the-architect-malvek.png",
                },
                new()
                {
                    Name = "Visionary Of The Table",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-039",
                    ImageUrl = "/images/cards/visionary-of-the-table.png",
                },
                new()
                {
                    Name = "Void Geisha",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-040",
                    ImageUrl = "/images/cards/void-geisha.png",
                },
                new()
                {
                    Name = "Weirdco Industries",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-041",
                    ImageUrl = "/images/cards/weirdco-industries.png",
                },
                new()
                {
                    Name = "Zerotrace",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-042",
                    ImageUrl = "/images/cards/zerotrace.png",
                },
                new()
                {
                    Name = "Ambassador Lira Voss",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-043",
                    ImageUrl = "/images/cards/ambassador-lira-voss.png",
                },
                new()
                {
                    Name = "Black Clinic Miracle",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-044",
                    ImageUrl = "/images/cards/black-clinic-miracle.png",
                },
                new()
                {
                    Name = "Black Market Upgrade",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-045",
                    ImageUrl = "/images/cards/black-market-upgrade.png",
                },
                new()
                {
                    Name = "Blackstar",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-046",
                    ImageUrl = "/images/cards/blackstar.png",
                },
                new()
                {
                    Name = "Blackwire Sato Female",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-047",
                    ImageUrl = "/images/cards/blackwire-sato-female.png",
                },
                new()
                {
                    Name = "Blackwire Sato Male",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-048",
                    ImageUrl = "/images/cards/blackwire-sato-male.png",
                },
                new()
                {
                    Name = "Catheoral Virus",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-049",
                    ImageUrl = "/images/cards/catheoral-virus.png",
                },
                new()
                {
                    Name = "Chairwoman Isadora Quell",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-050",
                    ImageUrl = "/images/cards/chairwoman-isadora-quell.png",
                },
                new()
                {
                    Name = "Chrome Ronin",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-051",
                    ImageUrl = "/images/cards/chrome-ronin.png",
                },
                new()
                {
                    Name = "Councilor Lysander Vale",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-052",
                    ImageUrl = "/images/cards/councilor-lysander-vale.png",
                },
                new()
                {
                    Name = "Data Ghost",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-053",
                    ImageUrl = "/images/cards/data-ghost.png",
                },
                new()
                {
                    Name = "Detective Kai Mori",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-054",
                    ImageUrl = "/images/cards/detective-kai-mori.png",
                },
                new()
                {
                    Name = "Doc Marquez",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-055",
                    ImageUrl = "/images/cards/doc-marquez.png",
                },
                new()
                {
                    Name = "Dr Synapse",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-056",
                    ImageUrl = "/images/cards/dr-synapse.png",
                },
                new()
                {
                    Name = "Dr Vesper Kao",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-057",
                    ImageUrl = "/images/cards/dr-vesper-kao.png",
                },
                new()
                {
                    Name = "Ghost Breach",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-058",
                    ImageUrl = "/images/cards/ghost-breach.png",
                },
                new()
                {
                    Name = "Ghost Slice",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-059",
                    ImageUrl = "/images/cards/ghost-slice.png",
                },
                new()
                {
                    Name = "Iron Cordon",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-060",
                    ImageUrl = "/images/cards/iron-cordon.png",
                },
                new()
                {
                    Name = "Ironteeth",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-061",
                    ImageUrl = "/images/cards/ironteeth.png",
                },
                new()
                {
                    Name = "Ironworld Kashta",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-062",
                    ImageUrl = "/images/cards/ironworld-kashta.png",
                },
                new()
                {
                    Name = "Kai Blackwire Sato",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-063",
                    ImageUrl = "/images/cards/kai-blackwire-sato.png",
                },
                new()
                {
                    Name = "Kai Spark Tanaka",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-064",
                    ImageUrl = "/images/cards/kai-spark-tanaka.png",
                },
                new()
                {
                    Name = "Katana Xr7 Hoverbike",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-065",
                    ImageUrl = "/images/cards/katana-xr7-hoverbike.png",
                },
                new()
                {
                    Name = "Kitsune Nocturne",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-066",
                    ImageUrl = "/images/cards/kitsune-nocturne.png",
                },
                new()
                {
                    Name = "Kojin The Exile",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-067",
                    ImageUrl = "/images/cards/kojin-the-exile.png",
                },
                new()
                {
                    Name = "Lunar Bazaar",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-068",
                    ImageUrl = "/images/cards/lunar-bazaar.png",
                },
                new()
                {
                    Name = "Madam Echo",
                    SetName = "Choom Vault Origins",
                    Rarity = "Unknown",
                    Colour = "Unknown",
                    CardType = "Unknown",
                    Classification = "Unknown",
                    CardNumber = "CVO-069",
                    ImageUrl = "/images/cards/madam-echo.png",
                },
            };

            context.Cards.AddRange(cards);
            context.SaveChanges();
        }

        private static void SeedCardPrintings(AppDbContext context)
        {
            const string setName = "Choom Vault Origins";

            var cardSet = context.CardSets
                .FirstOrDefault(cardSet => cardSet.Name == setName);

            if (cardSet is null)
            {
                cardSet = new CardSet
                {
                    Name = setName,
                    Code = "CVO"
                };

                context.CardSets.Add(cardSet);
                context.SaveChanges();
            }

            var cards = context.Cards
                .Where(card =>
                    card.SetName == setName &&
                    card.CardNumber != null)
                .ToList();

            var existingPrintings = context.CardPrintings
                .Where(printing => printing.CardSetId == cardSet.Id)
                .ToList();

            var cardPrintings = new List<CardPrinting>();

            foreach (var card in cards)
            {
                var printingExists = existingPrintings.Any(printing =>
                    printing.CardId == card.Id &&
                    printing.CardNumber == card.CardNumber);

                if (printingExists)
                {
                    continue;
                }

                var cardPrinting = new CardPrinting
                {
                    CardId = card.Id,
                    CardSetId = cardSet.Id,
                    CardNumber = card.CardNumber!,
                    Rarity = card.Rarity,
                    ImageUrl = card.ImageUrl,
                    LanguageCode = "en",
                    IsFoil = card.IsFoil,
                    IsAltArt = card.IsAltArt
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
    }
}