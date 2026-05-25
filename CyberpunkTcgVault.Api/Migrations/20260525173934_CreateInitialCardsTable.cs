using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CyberpunkTcgVault.Api.Migrations
{
    /// <inheritdoc />
    public partial class CreateInitialCardsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SetName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rarity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Colour = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CardType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Classification = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Keywords = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cost = table.Column<int>(type: "int", nullable: true),
                    Power = table.Column<int>(type: "int", nullable: true),
                    RamCost = table.Column<int>(type: "int", nullable: true),
                    IsLegend = table.Column<bool>(type: "bit", nullable: false),
                    HasBetaSymbol = table.Column<bool>(type: "bit", nullable: false),
                    IsKickstarterVersion = table.Column<bool>(type: "bit", nullable: false),
                    IsRetailVersion = table.Column<bool>(type: "bit", nullable: false),
                    IsFoil = table.Column<bool>(type: "bit", nullable: false),
                    IsAltArt = table.Column<bool>(type: "bit", nullable: false),
                    IsBoxTopper = table.Column<bool>(type: "bit", nullable: false),
                    IsPromo = table.Column<bool>(type: "bit", nullable: false),
                    IsStarterDeckExclusive = table.Column<bool>(type: "bit", nullable: false),
                    QuantityOwned = table.Column<int>(type: "int", nullable: false),
                    Condition = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CardNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cards", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cards");
        }
    }
}
