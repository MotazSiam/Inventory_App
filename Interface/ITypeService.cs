using Inventory_App.Entities;

namespace Inventory_App.Interface
{
    public interface ITypeService
    {
        public IEnumerable<Entities.Type> GetAll();
        public void Create(Entities.Type entity);
        public void Remove(int id);
        public Entities.Type GetById(int id);
        public void Edit(Entities.Type entity);
    }
}
