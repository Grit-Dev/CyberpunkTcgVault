using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CyberpunkTcgVault.Api.Migrations
{
    /// <inheritdoc />
    public partial class PublicCatalogueAndRegistrationHardening : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "EmailIndex",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_CardPrintings_CardSetId",
                table: "CardPrintings");

            migrationBuilder.AlterColumn<string>(
                name: "Notes",
                table: "Cards",
                type: "nvarchar(2000)",
                maxLength: 2000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Cards",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Keywords",
                table: "Cards",
                type: "nvarchar(250)",
                maxLength: 250,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Colour",
                table: "Cards",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Classification",
                table: "Cards",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CardType",
                table: "Cards",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Eddies",
                table: "Cards",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "Users",
                column: "NormalizedEmail",
                unique: true,
                filter: "[NormalizedEmail] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_CardSets_Code",
                table: "CardSets",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_Cards_CardType",
                table: "Cards",
                column: "CardType");

            migrationBuilder.CreateIndex(
                name: "IX_Cards_Classification",
                table: "Cards",
                column: "Classification");

            migrationBuilder.CreateIndex(
                name: "IX_Cards_Colour",
                table: "Cards",
                column: "Colour");

            migrationBuilder.CreateIndex(
                name: "IX_Cards_Name",
                table: "Cards",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_CardPrintings_CardSetId_CardNumber_CardId",
                table: "CardPrintings",
                columns: new[] { "CardSetId", "CardNumber", "CardId" });

            migrationBuilder.CreateIndex(
                name: "IX_CardPrintings_CardSetId_Rarity_CardId",
                table: "CardPrintings",
                columns: new[] { "CardSetId", "Rarity", "CardId" });

            migrationBuilder.CreateIndex(
                name: "IX_CardPrintings_Rarity",
                table: "CardPrintings",
                column: "Rarity");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "EmailIndex",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_CardSets_Code",
                table: "CardSets");

            migrationBuilder.DropIndex(
                name: "IX_Cards_CardType",
                table: "Cards");

            migrationBuilder.DropIndex(
                name: "IX_Cards_Classification",
                table: "Cards");

            migrationBuilder.DropIndex(
                name: "IX_Cards_Colour",
                table: "Cards");

            migrationBuilder.DropIndex(
                name: "IX_Cards_Name",
                table: "Cards");

            migrationBuilder.DropIndex(
                name: "IX_CardPrintings_CardSetId_CardNumber_CardId",
                table: "CardPrintings");

            migrationBuilder.DropIndex(
                name: "IX_CardPrintings_CardSetId_Rarity_CardId",
                table: "CardPrintings");

            migrationBuilder.DropIndex(
                name: "IX_CardPrintings_Rarity",
                table: "CardPrintings");

            migrationBuilder.DropColumn(
                name: "Eddies",
                table: "Cards");

            migrationBuilder.AlterColumn<string>(
                name: "Notes",
                table: "Cards",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(2000)",
                oldMaxLength: 2000,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Cards",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AlterColumn<string>(
                name: "Keywords",
                table: "Cards",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(250)",
                oldMaxLength: 250,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Colour",
                table: "Cards",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Classification",
                table: "Cards",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CardType",
                table: "Cards",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "Users",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "IX_CardPrintings_CardSetId",
                table: "CardPrintings",
                column: "CardSetId");
        }
    }
}
