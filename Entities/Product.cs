namespace Inventory_App.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameAR { get; set; }
        public string Description { get; set; }
        public string Model { get; set; }
        public string Size { get; set; }
        public string Code { get; set; }
        public string Electricity { get; set; }
        public string Engine { get; set; }
        public int StartStock { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsDeleted { get; set; }

        public int brandId { get; set; }
        public int CategoryId { get; set; }
        public int TypeId { get; set; }


        public Brand Brand { get; set; }
        public Category Category { get; set; }
        public Type Type { get; set; }

    }
}
