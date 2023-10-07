using Inventory_App.DTO.BatchDTOs;
using Inventory_App.Entities;

namespace Inventory_App.DTO.BillDTOs
{
    public class BillProductDTO
    {
        public int id { get; set; }
        public string productName { get; set; }
        public string ProductNameAR { get; set; }
        public string ProductDescription { get; set; }
        public int billId { get; set; }
        public int productId { get; set; }

        public int count { get; set; }
        public decimal price { get; set; }
        public DateTime billDate { get; set; }
        public int year { get; set; }
        public int month { get; set; }
        public int day { get; set; }

        public BillProductDTO GetDTO(BillProduct entity)
        {
            return new BillProductDTO
            {
                id = entity.Id,
                productId = entity.ProductId,
                productName = entity.Product.Name,
                ProductNameAR = entity.Product.NameAR,
                ProductDescription = entity.Product.Description,
                billDate = entity.BillDate,
                
                count = entity.Count,
                price = entity.Price,
                billId = entity.BillId,
                year = entity.Year,
                month = entity.Month,
                day = entity.Day,

            };
        }


    }
}
