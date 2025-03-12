using System.ComponentModel.DataAnnotations.Schema;

namespace ShowMasterApp.Core.Entities
{
    public class Product
    {
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Name { get; set; }

        public string? IpAddress { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string UserId { get; set; }
        public int? RegionId { get; set; }
    }
}
