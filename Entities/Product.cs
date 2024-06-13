namespace Inventory_App.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameAR { get; set; }
        public string? Description { get; set; }
        public string? Model { get; set; }
        public string? Size { get; set; }
        public string? Code { get; set; }
        public string? Electricity { get; set; }
        public string? Engine { get; set; }
        public int StartStock { get; set; }
        public string? Img { get; set; }
        public string? Unit { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsSpare { get; set; }
        public string SpareForProducts { get; set; }
        public decimal Cost { get; set; }

        public decimal Price { get; set; }
        public int brandId { get; set; }
        public int CategoryId { get; set; }
        public int TypeId { get; set; }


        public Brand Brand { get; set; }
        public Category Category { get; set; }
        public Type Type { get; set; }

    }
}
