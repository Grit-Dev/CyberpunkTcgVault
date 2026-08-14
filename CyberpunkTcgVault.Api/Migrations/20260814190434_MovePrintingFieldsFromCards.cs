using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CyberpunkTcgVault.Api.Migrations
{
    /// <inheritdoc />
    public partial class MovePrintingFieldsFromCards : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Add the remaining printing-specific columns first.
            migrationBuilder.AddColumn<bool>(
                name: "HasBetaSymbol",
                table: "CardPrintings",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsBoxTopper",
                table: "CardPrintings",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsKickstarterVersion",
                table: "CardPrintings",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsPromo",
                table: "CardPrintings",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsRetailVersion",
                table: "CardPrintings",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsStarterDeckExclusive",
                table: "CardPrintings",
                type: "bit",
                nullable: false,
                defaultValue: false);

            // The legacy Card model stored printing information directly
            // against the Card. That data can only be migrated safely when
            // each existing Card has exactly one CardPrinting.
            migrationBuilder.Sql(
                """
                IF EXISTS
                (
                    SELECT 1
                    FROM Cards c
                    WHERE
                    (
                        SELECT COUNT(*)
                        FROM CardPrintings cp
                        WHERE cp.CardId = c.Id
                    ) <> 1
                )
                BEGIN
                    ;THROW 50003,
                        'Unable to migrate printing fields because one or more Cards do not have exactly one CardPrinting.',
                        1;
                END
                """);

            // Copy the legacy printing data from Cards into CardPrintings
            // before the old Card columns are removed.
            migrationBuilder.Sql(
                """
                UPDATE cp
                SET
                    cp.CardNumber =
                        COALESCE(c.CardNumber, cp.CardNumber),
                    cp.Rarity =
                        c.Rarity,
                    cp.ImageUrl =
                        c.ImageUrl,
                    cp.IsFoil =
                        c.IsFoil,
                    cp.IsAltArt =
                        c.IsAltArt,
                    cp.HasBetaSymbol =
                        c.HasBetaSymbol,
                    cp.IsKickstarterVersion =
                        c.IsKickstarterVersion,
                    cp.IsRetailVersion =
                        c.IsRetailVersion,
                    cp.IsBoxTopper =
                        c.IsBoxTopper,
                    cp.IsPromo =
                        c.IsPromo,
                    cp.IsStarterDeckExclusive =
                        c.IsStarterDeckExclusive
                FROM CardPrintings cp
                INNER JOIN Cards c
                    ON c.Id = cp.CardId;
                """);

            // The printing-specific data now lives in CardPrintings.
            migrationBuilder.DropColumn(
                name: "CardNumber",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "HasBetaSymbol",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "IsAltArt",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "IsBoxTopper",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "IsFoil",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "IsKickstarterVersion",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "IsPromo",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "IsRetailVersion",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "IsStarterDeckExclusive",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "Rarity",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "SetName",
                table: "Cards");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Recreate the old Card columns first.
            migrationBuilder.AddColumn<string>(
                name: "CardNumber",
                table: "Cards",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HasBetaSymbol",
                table: "Cards",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Cards",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsAltArt",
                table: "Cards",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsBoxTopper",
                table: "Cards",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsFoil",
                table: "Cards",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsKickstarterVersion",
                table: "Cards",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsPromo",
                table: "Cards",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsRetailVersion",
                table: "Cards",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsStarterDeckExclusive",
                table: "Cards",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Rarity",
                table: "Cards",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SetName",
                table: "Cards",
                type: "nvarchar(max)",
                nullable: true);

            // Restore the old Card-level values before removing
            // the new CardPrinting columns.
            migrationBuilder.Sql(
                """
                UPDATE c
                SET
                    c.CardNumber =
                        cp.CardNumber,
                    c.Rarity =
                        cp.Rarity,
                    c.ImageUrl =
                        cp.ImageUrl,
                    c.IsFoil =
                        cp.IsFoil,
                    c.IsAltArt =
                        cp.IsAltArt,
                    c.HasBetaSymbol =
                        cp.HasBetaSymbol,
                    c.IsKickstarterVersion =
                        cp.IsKickstarterVersion,
                    c.IsRetailVersion =
                        cp.IsRetailVersion,
                    c.IsBoxTopper =
                        cp.IsBoxTopper,
                    c.IsPromo =
                        cp.IsPromo,
                    c.IsStarterDeckExclusive =
                        cp.IsStarterDeckExclusive,
                    c.SetName =
                        cs.Name
                FROM Cards c
                INNER JOIN CardPrintings cp
                    ON cp.CardId = c.Id
                INNER JOIN CardSets cs
                    ON cs.Id = cp.CardSetId;
                """);

            migrationBuilder.DropColumn(
                name: "HasBetaSymbol",
                table: "CardPrintings");

            migrationBuilder.DropColumn(
                name: "IsBoxTopper",
                table: "CardPrintings");

            migrationBuilder.DropColumn(
                name: "IsKickstarterVersion",
                table: "CardPrintings");

            migrationBuilder.DropColumn(
                name: "IsPromo",
                table: "CardPrintings");

            migrationBuilder.DropColumn(
                name: "IsRetailVersion",
                table: "CardPrintings");

            migrationBuilder.DropColumn(
                name: "IsStarterDeckExclusive",
                table: "CardPrintings");
        }
    }
}