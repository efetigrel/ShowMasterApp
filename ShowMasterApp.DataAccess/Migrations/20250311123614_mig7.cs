using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShowMasterApp.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class mig7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Regions_RegionId",
                table: "Products");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Regions_RegionId",
                table: "Products",
                column: "RegionId",
                principalTable: "Regions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Regions_RegionId",
                table: "Products");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Regions_RegionId",
                table: "Products",
                column: "RegionId",
                principalTable: "Regions",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
