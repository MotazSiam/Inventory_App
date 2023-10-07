using Inventory_App.DTO.BatchDTOs;
using Inventory_App.Entities;

namespace Inventory_App.DTO.ProductDTOs
{
    public class ProductDTO
    {
        public int id { get; set; }
        public string Name { get; set; }
        public string NameAR { get; set; }
        public string Description { get; set; }
        public string Model { get; set; }
        public string Size { get; set; }
        public string Code { get; set; }
        public string Electricity { get; set; }
        public string Engine { get; set; }
        public int StartStock { get; set; }

        public int stockCount { get; set; }
        public int categoryId { get; set; }
        public int typeId { get; set; }
        public int brandId { get; set; }

        public List<BatchProductDTO>? batchProducts { get; set; }

        public List<ProductByYearDTO>? productByYearDTOs { get; set; }  

        public ProductDTO GetDTO(Product entity)
        {
            return entity == null ? null : new ProductDTO
            {
                id = entity.Id,
                Name = entity.Name,
                NameAR = entity.NameAR,
                Description = entity.Description,
                Model = entity.Model,
                Size = entity.Size,
                Code = entity.Code,
                Electricity = entity.Electricity,
                Engine = entity.Engine,
                StartStock = entity.StartStock,
                brandId = entity.brandId,
                categoryId = entity.CategoryId,
                typeId = entity.TypeId,

            };
        }
    }
}
