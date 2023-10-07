namespace Inventory_App.Entities
{
    public class BillProduct
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int BillId { get; set; }
        public int Count { get; set; }
        public decimal Price { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public int Day { get; set; }
        public DateTime BillDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsDeleted { get; set; }

        public Product Product { get; set; }
        public Bill Bill { get; set; }
    }
}
