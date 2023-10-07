namespace Inventory_App.Entities
{
    public class BatchProduct
    {
        public int Id { get; set; }
        public int ProductId { get; set;}
        public int BatchId { get; set;}
        public int Count { get; set; } 
        public decimal Price { get; set;}
        public int Year { get; set;}
        public int Month { get; set;}
        public OpertionType BtachType { get; set; }
        public DateTime OperationDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsDeleted { get; set; }

        public Product Product { get; set; }
        public Batch Batch { get; set; }

    }
}
