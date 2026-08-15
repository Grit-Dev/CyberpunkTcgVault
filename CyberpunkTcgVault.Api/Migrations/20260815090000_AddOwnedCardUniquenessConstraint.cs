using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CyberpunkTcgVault.Api.Migrations
{
    public partial class AddOwnedCardUniquenessConstraint : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Older development databases may contain multiple rows for the
            // same user/printing. Keep the oldest row, roll quantities into
            // it, then enforce the intended one-row-per-printing invariant.
            migrationBuilder.Sql(
                """
                ;WITH OwnershipTotals AS
                (
                    SELECT
                        UserId,
                        CardPrintingId,
                        CASE
                            WHEN SUM(CAST(QuantityOwned AS bigint)) > 999 THEN 999
                            ELSE CAST(SUM(CAST(QuantityOwned AS bigint)) AS int)
                        END AS TotalQuantity
                    FROM OwnedCards
                    GROUP BY UserId, CardPrintingId
                )
                UPDATE oc
                SET QuantityOwned = totals.TotalQuantity
                FROM OwnedCards oc
                INNER JOIN OwnershipTotals totals
                    ON totals.UserId = oc.UserId
                    AND totals.CardPrintingId = oc.CardPrintingId;

                ;WITH RankedOwnership AS
                (
                    SELECT
                        Id,
                        ROW_NUMBER() OVER
                        (
                            PARTITION BY UserId, CardPrintingId
                            ORDER BY Id
                        ) AS RowNumber
                    FROM OwnedCards
                )
                DELETE FROM RankedOwnership
                WHERE RowNumber > 1;
                """);

            migrationBuilder.DropIndex(
                name: "IX_OwnedCards_UserId",
                table: "OwnedCards");

            migrationBuilder.CreateIndex(
                name: "IX_OwnedCards_UserId_CardPrintingId",
                table: "OwnedCards",
                columns: new[] { "UserId", "CardPrintingId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OwnedCards_UserId_CardPrintingId",
                table: "OwnedCards");

            migrationBuilder.CreateIndex(
                name: "IX_OwnedCards_UserId",
                table: "OwnedCards",
                column: "UserId");
        }
    }
}
