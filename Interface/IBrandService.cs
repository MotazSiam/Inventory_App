using Inventory_App.Entities;

namespace Inventory_App.Interface
{
    public interface IBrandService
    {
        public IEnumerable<Brand> GetAll();
        public void Create(Brand entity);
        public void Remove(int id);
        public Brand GetById(int id);
        public void Edit(Brand entity);
    }
}
