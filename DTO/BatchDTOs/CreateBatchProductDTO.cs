using Inventory_App.Entities;

namespace Inventory_App.DTO.BatchDTOs
{
    public class CreateBatchProductDTO
    {
        public int ProductId { get; set; }
        public int? BatchId { get; set; }
        public int Count { get; set; }
        public decimal Price { get; set; } = 0;
        public OpertionType BtachType { get; set; }
        public DateTime OperationDate { get; set; }

        public BatchProduct GetEntity(Batch batch)
        {
            return new BatchProduct
            {
                ProductId = ProductId,
                BatchId = batch.Id,
                Count = Count,
                OperationDate = batch.OperationDate,
                BtachType = batch.BtachType,
                Price = Price,
                CreatedDate = DateTime.Now,
                IsDeleted = false,
                Year = batch.OperationDate.Year,
                Month = batch.OperationDate.Month,
                
            };
        }
    } }

