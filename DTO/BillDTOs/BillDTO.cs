using Inventory_App.Entities;

namespace Inventory_App.DTO.BillDTOs
{
    public class BillDTO
    {
        public int id { get; set; }
        public string? bookNo { get; set; }
        public int productCount { get; set; }
        public decimal totalAmount { get; set; }
        public DateTime billDate { get; set; }
        public Customer customer { get; set; }
        public string status { get; set; }
        public string? description { get; set; }
        public List<BillProductDTO>? billProducts { get; set; }

        public BillDTO GetDTO(Bill entity)
        {
            return entity == null ? null : new BillDTO
            {
                id = entity.Id,
                bookNo = entity.BookNo,
                productCount = entity.ProductCount,
                totalAmount = entity.TotalAmount,
                billDate = entity.BillDate,
                customer = entity.Customer,
                description = entity.Description,
                status = entity.Status.ToString(),
            };
        }


    }
}
