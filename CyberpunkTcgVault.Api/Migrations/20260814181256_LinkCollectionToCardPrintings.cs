using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CyberpunkTcgVault.Api.Migrations
{
    /// <inheritdoc />
    public partial class LinkCollectionToCardPrintings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OwnedCards_Cards_CardId",
                table: "OwnedCards");

            migrationBuilder.DropForeignKey(
                name: "FK_WishList_Cards_CardId",
                table: "WishList");

            migrationBuilder.RenameColumn(
                name: "CardId",
                table: "WishList",
                newName: "CardPrintingId");

            migrationBuilder.RenameIndex(
                name: "IX_WishList_CardId",
                table: "WishList",
                newName: "IX_WishList_CardPrintingId");

            migrationBuilder.RenameColumn(
                name: "CardId",
                table: "OwnedCards",
                newName: "CardPrintingId");

            migrationBuilder.RenameIndex(
                name: "IX_OwnedCards_CardId",
                table: "OwnedCards",
                newName: "IX_OwnedCards_CardPrintingId");

            // At this point CardPrintingId still contains the OLD CardId value.
            // Make sure every existing OwnedCard can be mapped to a printing.
            migrationBuilder.Sql(
                """
                IF EXISTS
                (
                    SELECT 1
                    FROM OwnedCards oc
                    WHERE NOT EXISTS
                    (
                        SELECT 1
                        FROM CardPrintings cp
                        WHERE cp.CardId = oc.CardPrintingId
                    )
                )
                BEGIN
                    ;THROW 50001,
                        'Unable to migrate OwnedCards because one or more Cards do not have a CardPrinting.',
                        1;
                END
                """);

            // Convert the old CardId value into the matching CardPrinting.Id.
            migrationBuilder.Sql(
                """
                UPDATE oc
                SET CardPrintingId = matchingPrinting.Id
                FROM OwnedCards oc
                CROSS APPLY
                (
                    SELECT TOP (1) cp.Id
                    FROM CardPrintings cp
                    WHERE cp.CardId = oc.CardPrintingId
                    ORDER BY cp.Id
                ) matchingPrinting;
                """);

            // Make sure every existing wishlist item can also be mapped.
            migrationBuilder.Sql(
                """
                IF EXISTS
                (
                    SELECT 1
                    FROM WishList wl
                    WHERE NOT EXISTS
                    (
                        SELECT 1
                        FROM CardPrintings cp
                        WHERE cp.CardId = wl.CardPrintingId
                    )
                )
                BEGIN
                    ;THROW 50002,
                        'Unable to migrate WishList because one or more Cards do not have a CardPrinting.',
                        1;
                END
                """);

            // Convert the old CardId value into the matching CardPrinting.Id.
            migrationBuilder.Sql(
                """
                UPDATE wl
                SET CardPrintingId = matchingPrinting.Id
                FROM WishList wl
                CROSS APPLY
                (
                    SELECT TOP (1) cp.Id
                    FROM CardPrintings cp
                    WHERE cp.CardId = wl.CardPrintingId
                    ORDER BY cp.Id
                ) matchingPrinting;
                """);

            migrationBuilder.AddForeignKey(
                name: "FK_OwnedCards_CardPrintings_CardPrintingId",
                table: "OwnedCards",
                column: "CardPrintingId",
                principalTable: "CardPrintings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WishList_CardPrintings_CardPrintingId",
                table: "WishList",
                column: "CardPrintingId",
                principalTable: "CardPrintings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OwnedCards_CardPrintings_CardPrintingId",
                table: "OwnedCards");

            migrationBuilder.DropForeignKey(
                name: "FK_WishList_CardPrintings_CardPrintingId",
                table: "WishList");

            // Convert CardPrintingId back into the logical CardId
            // before renaming the column back.
            migrationBuilder.Sql(
                """
                UPDATE oc
                SET CardPrintingId = cp.CardId
                FROM OwnedCards oc
                INNER JOIN CardPrintings cp
                    ON cp.Id = oc.CardPrintingId;
                """);

            migrationBuilder.Sql(
                """
                UPDATE wl
                SET CardPrintingId = cp.CardId
                FROM WishList wl
                INNER JOIN CardPrintings cp
                    ON cp.Id = wl.CardPrintingId;
                """);

            migrationBuilder.RenameColumn(
                name: "CardPrintingId",
                table: "WishList",
                newName: "CardId");

            migrationBuilder.RenameIndex(
                name: "IX_WishList_CardPrintingId",
                table: "WishList",
                newName: "IX_WishList_CardId");

            migrationBuilder.RenameColumn(
                name: "CardPrintingId",
                table: "OwnedCards",
                newName: "CardId");

            migrationBuilder.RenameIndex(
                name: "IX_OwnedCards_CardPrintingId",
                table: "OwnedCards",
                newName: "IX_OwnedCards_CardId");

            migrationBuilder.AddForeignKey(
                name: "FK_OwnedCards_Cards_CardId",
                table: "OwnedCards",
                column: "CardId",
                principalTable: "Cards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WishList_Cards_CardId",
                table: "WishList",
                column: "CardId",
                principalTable: "Cards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}