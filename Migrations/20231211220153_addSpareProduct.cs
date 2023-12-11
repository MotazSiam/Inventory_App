using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Inventory_App.Migrations
{
    /// <inheritdoc />
    public partial class addSpareProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSpare",
                table: "Products",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "SpareForProductId",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_SpareForProductId",
                table: "Products",
                column: "SpareForProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Products_SpareForProductId",
                table: "Products",
                column: "SpareForProductId",
                principalTable: "Products",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Products_SpareForProductId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_SpareForProductId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "IsSpare",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "SpareForProductId",
                table: "Products");
        }
    }
}
