using System.ComponentModel.DataAnnotations;

namespace ShowMasterApp.Core.Entities
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; }

        [Required]
        public string QrCode { get; set; } // Ürün Id'sine göre oluşturulacak QR kodu
    }
}
