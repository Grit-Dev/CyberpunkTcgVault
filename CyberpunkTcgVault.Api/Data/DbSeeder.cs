using CyberpunkTcgVault.Api.Models;

namespace CyberpunkTcgVault.Api.Data
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext context)
        {
            if (context.Cards.Any())
            {
                return;
            }

            var cards = new List<Card>
            {
                new() {
                    Name = "Black Clinic Miracle",
                    SetName = "Choom Vault Origins",
                    Rarity = "Legendary",
                    Colour = "Black",
                    CardType = "Character",
                    Classification = "Medtech",
                    Keywords = "Cybernetics, Healing, Underground",
                    Cost = 7,
                    Power = 5,
                    RamCost = 2,
                    IsLegend = true,
                    CardNumber = "CVO-001",
                    ImageUrl = "/images/cards/black-clinic-miracle.png",
                    Notes = "An underground cybernetic surgeon operating beyond corporate control."
                },

                new() {
                    Name = "Madam Echo",
                    SetName = "Choom Vault Origins",
                    Rarity = "Epic",
                    Colour = "Blue",
                    CardType = "Character",
                    Classification = "Fixer",
                    Keywords = "Information Broker, Secrets, Network",
                    Cost = 5,
                    Power = 3,
                    RamCost = 3,
                    CardNumber = "CVO-002",
                    ImageUrl = "/images/cards/madam-echo.png",
                    Notes = "A master information broker who trades secrets across Night City."
                },

                new() {
                    Name = "Kai Blackwire Sato",
                    SetName = "Choom Vault Origins",
                    Rarity = "Legendary",
                    Colour = "Purple",
                    CardType = "Character",
                    Classification = "Netrunner",
                    Keywords = "Hacking, Cyberdeck, Digital Warfare",
                    Cost = 8,
                    Power = 6,
                    RamCost = 4,
                    IsLegend = true,
                    CardNumber = "CVO-003",
                    ImageUrl = "/images/cards/kai-blackwire-sato.png",
                    Notes = "A legendary netrunner capable of bypassing the most secure systems."
                },

                new() {
                    Name = "Void Geisha",
                    SetName = "Choom Vault Origins",
                    Rarity = "Rare",
                    Colour = "Red",
                    CardType = "Character",
                    Classification = "Solo",
                    Keywords = "Stealth, Combat, Precision",
                    Cost = 4,
                    Power = 7,
                    RamCost = 1,
                    CardNumber = "CVO-004",
                    ImageUrl = "/images/cards/void-geisha.png",
                    Notes = "A cyber-enhanced operative known for precision and stealth."
                },

                new() {
                    Name = "Viktor The Architect",
                    SetName = "Choom Vault Origins",
                    Rarity = "Epic",
                    Colour = "White",
                    CardType = "Character",
                    Classification = "Corporate",
                    Keywords = "Strategy, Influence, Control",
                    Cost = 6,
                    Power = 4,
                    RamCost = 3,
                    CardNumber = "CVO-005",
                    ImageUrl = "/images/cards/viktor-the-architect.png",
                    Notes = "A corporate strategist manipulating the future of the city from behind the scenes."
                },

                new() {
                    Name = "Detective Kai Mori",
                    SetName = "Choom Vault Origins",
                    Rarity = "Rare",
                    Colour = "Blue",
                    CardType = "Character",
                    Classification = "Investigator",
                    Keywords = "Investigation, Evidence, Tracking",
                    Cost = 4,
                    Power = 4,
                    RamCost = 2,
                    CardNumber = "CVO-006",
                    ImageUrl = "/images/cards/detective-kai-mori.png",
                    Notes = "A detective uncovering the hidden crimes of the megacity."
                },

                new() {
                    Name = "The Last Broadcast",
                    SetName = "Choom Vault Origins",
                    Rarity = "Legendary",
                    Colour = "Purple",
                    CardType = "Event",
                    Classification = "Media",
                    Keywords = "Signal, Propaganda, Information",
                    Cost = 9,
                    RamCost = 5,
                    IsLegend = true,
                    CardNumber = "CVO-007",
                    ImageUrl = "/images/cards/the-last-broadcast.png",
                    Notes = "A forbidden transmission that changed the balance of power."
                },

                new() {
                    Name = "Orbital Drop",
                    SetName = "Choom Vault Origins",
                    Rarity = "Epic",
                    Colour = "Red",
                    CardType = "Event",
                    Classification = "Tactical",
                    Keywords = "Attack, Deployment, Military",
                    Cost = 6,
                    RamCost = 3,
                    CardNumber = "CVO-008",
                    ImageUrl = "/images/cards/orbital-drop.png",
                    Notes = "A devastating tactical strike launched from above the city."
                },

                new() {
                    Name = "Titan Forge",
                    SetName = "Choom Vault Origins",
                    Rarity = "Legendary",
                    Colour = "Black",
                    CardType = "Location",
                    Classification = "Industrial",
                    Keywords = "Manufacturing, Cyberware, Production",
                    Cost = 8,
                    IsLegend = true,
                    CardNumber = "CVO-009",
                    ImageUrl = "/images/cards/titan-forge.png",
                    Notes = "An industrial fortress producing the next generation of cybernetic technology."
                },

                new() {
                    Name = "Lunar Bazaar",
                    SetName = "Choom Vault Origins",
                    Rarity = "Rare",
                    Colour = "Blue",
                    CardType = "Location",
                    Classification = "Market",
                    Keywords = "Trading, Commerce, Black Market",
                    Cost = 3,
                    CardNumber = "CVO-010",
                    ImageUrl = "/images/cards/lunar-bazaar.png",
                    Notes = "A dangerous marketplace where anything can be bought for the right price."
                },

                new() {
                    Name = "Katana XR7 Hoverbike",
                    SetName = "Choom Vault Origins",
                    Rarity = "Epic",
                    Colour = "Red",
                    CardType = "Equipment",
                    Classification = "Vehicle",
                    Keywords = "Speed, Mobility, Transport",
                    Cost = 5,
                    Power = 5,
                    RamCost = 2,
                    CardNumber = "CVO-011",
                    ImageUrl = "/images/cards/katana-xr7-hoverbike.png",
                    Notes = "A high-performance cyberpunk vehicle built for rapid urban movement."
                }
            };

            context.Cards.AddRange(cards);
            context.SaveChanges();

        }
    }
}
