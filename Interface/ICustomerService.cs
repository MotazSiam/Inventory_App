using Inventory_App.Entities;

namespace Inventory_App.Interface
{
    public interface ICustomerService
    {
        public IEnumerable<Customer> GetAll();
        public void Create(Customer entity);
        public void Remove(Guid id);
        public void Edit(Customer entity);
        public Customer GetById(Guid id);
    }
}
