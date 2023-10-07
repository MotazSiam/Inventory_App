using Inventory_App.DTO.ProductDTOs;

namespace Inventory_App.DTO.BatchDTOs
{
    public class BatchListDTO
    {
        public List<BatchDTO>? Batches { get; set; }
        public List<ProductDTO>? products { get; set; }

        public int? pageNumber { get; set; } = 0;
        public int? pageSize { get; set; } = 10;
        public int? nextPage { get; set; } = 1;
    }
}
