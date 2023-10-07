using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Inventory_App.Migrations
{
    /// <inheritdoc />
    public partial class addupdatecol : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "UpadateDate",
                table: "Batches",
                type: "datetime(6)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UpadateDate",
                table: "Batches");
        }
    }
}
