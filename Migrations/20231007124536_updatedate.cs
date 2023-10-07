using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Inventory_App.Migrations
{
    /// <inheritdoc />
    public partial class updatedate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UpadateDate",
                table: "Batches",
                newName: "UpdatedDate");

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedDate",
                table: "Bills",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "Bills");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                table: "Batches",
                newName: "UpadateDate");
        }
    }
}
