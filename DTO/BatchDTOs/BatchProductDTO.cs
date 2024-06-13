using Inventory_App.Entities;

namespace Inventory_App.DTO.BatchDTOs
{
    public class BatchProductDTO
    {
        public int id { get; set; }
        public string productName { get; set; }
        public string ProductNameAR { get; set; }
        public string ProductDescription { get; set; }
        public int batchId { get; set; }
        public int productId { get; set; }
        public string? supplierName { get; set; }

        public int count { get; set; }
        public decimal price { get; set; }
        public OpertionType btachType { get; set; }
        public DateTime operationDate { get; set; }
        public int year { get; set; }
        public int month { get; set; }

        public BatchProductDTO GetDTO(BatchProduct entity)
        {
            return new BatchProductDTO
            {
                id = entity.Id,
                productId = entity.ProductId,
                productName = entity.Product.Name,
                ProductNameAR = entity.Product.NameAR,
                ProductDescription = entity.Product.Description,
                operationDate = entity.OperationDate,
                btachType = entity.BtachType,
                count = entity.Count,
                price = entity.Price,
                batchId = entity.BatchId,
                year = entity.Year,
                month = entity.Month,
                supplierName = entity.Batch == null ? null : entity.Batch.SupplierName,
            };
        }

            

    }
}
