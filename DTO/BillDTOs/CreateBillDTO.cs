using Inventory_App.DTO.BatchDTOs;
using Inventory_App.Entities;
using System.IO;

namespace Inventory_App.DTO.BillDTOs
{
    public class CreateBillDTO
    {
        public string? bookNo { get; set; }
        public int productCount { get; set; }
        public decimal totalAmount { get; set; }
        public DateTime billDate { get; set; }
        public Guid customerId { get; set; }
        public string? description { get; set; }
        public List<CreateBillProductDTO>? billProducts { get; set; }

        public Bill GetEntity()
        {
            return new Bill
            {
                BookNo =  bookNo == null ? "" : bookNo,
                Description = description == null ? null : description,
                ProductCount = productCount,
                TotalAmount = totalAmount,
                BillDate = billDate,
                customerId = customerId,
                CreatedDate = DateTime.Now,
                Status = BillStatus.Pending,
                IsDeleted = false,

            };
        }

    }
}
