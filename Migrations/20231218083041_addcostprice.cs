using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Inventory_App.Migrations
{
    /// <inheritdoc />
    public partial class addcostprice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Products_SpareForProductId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_SpareForProductId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "SpareForProductId",
                table: "Products");

            migrationBuilder.AddColumn<decimal>(
                name: "Cost",
                table: "Products",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Products",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "SpareForProducts",
                table: "Products",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cost",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "SpareForProducts",
                table: "Products");

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
    }
}
