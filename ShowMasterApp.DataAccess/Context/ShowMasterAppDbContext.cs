using Microsoft.EntityFrameworkCore;
using ShowMasterApp.DataAccess.Entities;

namespace ShowMasterApp.DataAccess.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Event> Events { get; set; }
    }
}
