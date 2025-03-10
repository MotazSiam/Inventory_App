﻿using Inventory_App.Entities;

namespace Inventory_App.DTO.ProductDTOs
{
    public class UpdateProductDTO
    {
        public int id { get; set; }
        public string name { get; set; }
        public string nameAR { get; set; }
        public string description { get; set; }
        public string model { get; set; }
        public string size { get; set; }
        public string code { get; set; }
        public string electricity { get; set; }
        public string engine { get; set; }
        public int startStock { get; set; }
        public int brandId { get; set; }
        public int categoryId { get; set; }

              public string img { get; set; } = "";
        public string unit { get; set; } = "piece";
        public string spareForProducts { get; set; } = "";
        public decimal cost { get; set; } = 0;
        public decimal price { get; set; } = 0;

        public bool isSpare { get; set; } = false;
        public int? spareForProductId { get; set; }
        public int typeId { get; set; }
        public DateTime createDate { get; set; }


        public Product GetEntity()
        {
            return new Product
            {
                Id = id,
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
                Img = img,
                Unit = unit,
                TypeId = typeId,
                CategoryId = categoryId,
                IsDeleted = false,
                CreatedDate = createDate,
                IsSpare = isSpare,
                SpareForProducts = spareForProducts,
                Cost = cost,
                Price = price,
                
                

            };
        }
    }
}
