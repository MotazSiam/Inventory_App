using Inventory_App.Entities;

namespace Inventory_App.DTO.ProductDTOs
{
    public class ProductOperationDTO
    {
        public DateTime date { get; set; }
        public bool isSales { get; set; }
        public OpertionType opertionType { get; set; }
        public int count { get; set; }
        public decimal price { get; set; }
        public int? batchId { get; set; }
        public int? billId { get; set; }

        public ProductOperationDTO GetDTOFromBatch(BatchProduct entity)
        {
            return new ProductOperationDTO
            {
                date = entity.OperationDate,
                isSales = false,
                opertionType = entity.BtachType,
                count = entity.Count,
                price = entity.Price,
                batchId = entity.BatchId
            };
        }

        public ProductOperationDTO GETDTOFromBill(BillProduct entity)
        {
            return new ProductOperationDTO
            {
                date = entity.BillDate,
                isSales = true,
                opertionType = OpertionType.Decrease,
                count = entity.Count,
                price = entity.Price,
                billId = entity.BillId
            };
        }

    }
}
