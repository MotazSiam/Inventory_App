using Inventory_App.DTO.BatchDTOs;
using Inventory_App.Entities;

namespace Inventory_App.Interface
{
    public interface IBatchService
    {
        public IEnumerable<Batch> GetAll();
        public void Create(CreateBatchDTO batchDTO);
        public void Remove(Guid id);
        public Batch GetById(Guid id);
        public List<BatchProductDTO> GetBatchProducts(int batchId);
        public BatchListDTO GetBatchesforProducts(BatchListDTO dto);
        public void Update(UpdateBatchDTO batchDTO);
        public BatchDTO GetBatchById(int id);


    }
}
