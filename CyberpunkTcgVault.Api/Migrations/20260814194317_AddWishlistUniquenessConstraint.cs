using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CyberpunkTcgVault.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddWishlistUniquenessConstraint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_WishList_UserId",
                table: "WishList");

            migrationBuilder.CreateIndex(
                name: "IX_WishList_UserId_CardPrintingId",
                table: "WishList",
                columns: new[] { "UserId", "CardPrintingId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_WishList_UserId_CardPrintingId",
                table: "WishList");

            migrationBuilder.CreateIndex(
                name: "IX_WishList_UserId",
                table: "WishList",
                column: "UserId");
        }
    }
}
