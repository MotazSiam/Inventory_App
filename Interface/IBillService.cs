using Inventory_App.DTO.BillDTOs;
using Inventory_App.Entities;

namespace Inventory_App.Interface
{
    public interface IBillService
    {
        public void Create(CreateBillDTO billDTO);
        public IEnumerable<Bill> GetAll();
        public BillDTO GetById(int id);
        public void Update(UpdateBillDTO billDTO);
    }
}
