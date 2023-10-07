using Inventory_App.Entities;

namespace Inventory_App.DTO.BatchDTOs
{
    public class BatchDTO
    {
        public int id { get; set; }
        public string code { get; set; }
        public string supplierName { get; set; }
        public int productCount { get; set; }
        public OpertionType btachType { get; set; }
        public string? inventoryName { get; set; }
        public decimal totalAmount { get; set; }
        public DateTime operationDate { get; set; }
        public string? note { get; set; }

        public List<BatchProductDTO>? batchProduct { get; set; }

        public BatchDTO GetDTO(Batch entity)
        {
            return entity == null ? null : new BatchDTO
            {
                id = entity.Id,
                code = entity.Code,
                supplierName = entity.SupplierName,
                productCount = entity.ProductCount,
                btachType = entity.BtachType,
                inventoryName = entity.InventoryName,
                operationDate = entity.OperationDate,
                note = entity.Note,

            };
        }

    }
}
