using Inventory_App.Entities;

namespace Inventory_App.DTO.BatchDTOs
{
    public class CreateBatchDTO
    {
        public string code { get; set; }
        public string supplierName { get; set; }
        public int productCount { get; set; }
        public OpertionType btachType { get; set; }
        public string? inventoryName { get; set; }

        public decimal totalAmount { get; set; }
        public DateTime operationDate { get; set; }
        public string? note { get; set; }

        public List<CreateBatchProductDTO>? batchProducts { get; set; }

        public Batch GetEntity()
        {
            return new Batch
            {
                Code = code,
                SupplierName = supplierName,
                ProductCount = productCount,
                BtachType = btachType,
                InventoryName = inventoryName,
                TotalAmount = totalAmount,
                OperationDate = operationDate,
                Note = note,
                CreatedDate = DateTime.Now,
                IsDeleted = false,

            };
        }
    }
}
