namespace Inventory_App.Entities
{
    public class Bill
    {
        public int Id { get; set; }
        public string? BookNo { get; set; }
        public string? Description { get; set; }
        public int ProductCount { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime BillDate { get; set; }
        public Guid customerId { get; set; }
        public Customer Customer { get; set; }
        public BillStatus Status { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set;}
    }

    public enum BillStatus
    {
        Pending,
        Pay,
        Confirmed,
        Closed

    }
}
