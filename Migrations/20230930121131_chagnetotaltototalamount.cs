using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Inventory_App.Migrations
{
    /// <inheritdoc />
    public partial class chagnetotaltototalamount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Total",
                table: "Bills",
                newName: "TotalAmount");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TotalAmount",
                table: "Bills",
                newName: "Total");
        }
    }
}
