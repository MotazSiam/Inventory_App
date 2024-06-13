using Inventory_App.Entities;

namespace Inventory_App.DTO.ProductDTOs
{
    public class CreateProductDTO
    {
        public string name { get; set; }
        public string nameAR { get; set; }
        public string description { get; set; } = "";
        public string model { get; set; } = "";
        public string size { get; set; } = "";
        public string code { get; set; } = "";
        public string electricity { get; set; } = "";
        public string engine { get; set; } = "";
        public string img { get; set; } = "";
        public string unit { get; set; } = "piece";
        public bool isSpare { get; set; } = false;
        public string spareForProducts { get; set; } = "";
        public decimal cost { get; set; } = 0;
        public decimal price { get; set; } = 0;
        public int startStock { get; set; }
        public int brandId { get; set; }
        public int typeId { get; set; }
        public int categoryId { get; set; }

        public Product GetEntity()
        {
            return new Product
            {
                Name = name,
                NameAR = nameAR,
                Description = description,
                Model = model,
                Size = size,
                Code = code,
                Electricity = electricity,
                Engine = engine,
                brandId = brandId,
                StartStock = startStock,
                Price = price,
                Cost = cost,
                SpareForProducts = spareForProducts,
                IsSpare = isSpare,
                Img = img,
                Unit = unit,
                TypeId = typeId,
                CategoryId = categoryId,
                IsDeleted = false,
                CreatedDate = DateTime.Now,
            };
        }

    }
}
