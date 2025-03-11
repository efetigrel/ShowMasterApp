using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ShowMasterApp.Core.Entities;

namespace ShowMasterApp.DataAccess.Context
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // Global olarak operatör tarafından eklenen ürünler
        public DbSet<Product> Products { get; set; }

        // Kullanıcıya özel bölgeler
        public DbSet<Region> Regions { get; set; }

        // Kullanıcının QR kodu okutarak eklediği ürünlerin, bölge ve kullanıcı ilişkisini tutan tablo
        public DbSet<UserProduct> UserProducts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Region - ApplicationUser ilişkisi: Her bölge, bir kullanıcıya ait
            modelBuilder.Entity<Region>()
                .HasOne(r => r.User)
                .WithMany() // Eğer ApplicationUser modeline navigation property eklemek istersen: .WithMany(u => u.Regions)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // UserProduct - ApplicationUser ilişkisi: Her kullanıcı ürünü, bir kullanıcıya ait
            modelBuilder.Entity<UserProduct>()
                .HasOne(up => up.User)
                .WithMany() // İsteğe bağlı: .WithMany(u => u.UserProducts)
                .HasForeignKey(up => up.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // UserProduct - Product ilişkisi: Her kullanıcı ürünü, global bir ürüne ait
            modelBuilder.Entity<UserProduct>()
                .HasOne(up => up.Product)
                .WithMany() // İsteğe bağlı: .WithMany(p => p.UserProducts)
                .HasForeignKey(up => up.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            // UserProduct - Region ilişkisi: Her kullanıcı ürünü, bir bölgeye eklenir
            modelBuilder.Entity<UserProduct>()
                .HasOne(up => up.Region)
                .WithMany() // İsteğe bağlı: .WithMany(r => r.UserProducts)
                .HasForeignKey(up => up.RegionId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
