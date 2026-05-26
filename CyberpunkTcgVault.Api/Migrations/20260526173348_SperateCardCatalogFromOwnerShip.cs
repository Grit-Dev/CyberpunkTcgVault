using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CyberpunkTcgVault.Api.Migrations
{
    /// <inheritdoc />
    public partial class SperateCardCatalogFromOwnerShip : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Condition",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "QuantityOwned",
                table: "Cards");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Condition",
                table: "Cards",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "QuantityOwned",
                table: "Cards",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
