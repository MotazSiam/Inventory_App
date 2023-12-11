namespace Inventory_App.Entities
{
    public class Batch
    {
        public int Id { get; set; }
        public string BookNo { get; set; }
        public string InvoiceNo { get; set; }
        public string SupplierName { get; set; }
        public int ProductCount { get; set; }
        public OpertionType BtachType { get; set; }
        public string? InventoryName { get; set; }

        public decimal TotalAmount { get;set; }
        public DateTime OperationDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string? Note { get;set; }
        public bool IsDeleted { get; set; }


    }

    public enum OpertionType
    {
        Delivery,
        Dispose
    }
}
