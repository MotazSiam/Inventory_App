using Inventory_App.Entities;

namespace Inventory_App.Interface
{
    public interface ICategoryService
    {
        public IEnumerable<Category> GetAll();
        public void Create(Category entity);
        public void Remove(int id);
        public Category GetById(int id);
        public void Edit(Category entity);
    }
}
