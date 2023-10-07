using Inventory_App.DTO.BatchDTOs;
using Inventory_App.Entities;

namespace Inventory_App.DTO.BillDTOs
{
    public class UpdateBillDTO
    {
        public int bill_Id { get; set; }
        public string? bookNo { get; set; }
        public string? description { get; set; }
        public int productCount { get; set; }
        public decimal totalAmount { get; set; }
        public DateTime billDate { get; set; }
        public Guid customerId { get; set; }
        public BillStatus status { get; set; }
        public List<CreateBillProductDTO>? billProducts { get; set; }

        public Bill GetEntity()
        {
            return new Bill
            {
                Id = bill_Id,
                BookNo = bookNo,
                BillDate = billDate,
                customerId = customerId,
                Description = description,
                TotalAmount = totalAmount,
                ProductCount = productCount,
                Status = status
            };
        }
    }
}
