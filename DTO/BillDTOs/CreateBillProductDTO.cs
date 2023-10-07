using Inventory_App.Entities;

namespace Inventory_App.DTO.BillDTOs
{
    public class CreateBillProductDTO
    {
        public int productId { get; set; }
        public int count { get; set; }
        public decimal price { get; set; }


        public BillProduct GetEntity(Bill bill)
        {
            return new BillProduct
            {
                ProductId = productId,
                BillId = bill.Id,
                Count = count,
                BillDate = bill.BillDate,
                Price = price,
                CreatedDate = DateTime.Now,
                IsDeleted = false,
                Year = bill.BillDate.Year,
                Month = bill.BillDate.Month,
                Day = bill.BillDate.Day,
            };
        }
    }
}
