using Inventory_App.DTO.BatchDTOs;
using Inventory_App.Entities;
using Inventory_App.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileSystemGlobbing;

namespace Inventory_App.Services
{
    public class BatchService : IBatchService
    {
        private readonly IGenericRepository<Batch> Repo;
        private readonly IGenericRepository<BatchProduct> RepoBatchProduct;
        private readonly IProductService  _productService;
        public BatchService(IGenericRepository<Batch> repo, IGenericRepository<BatchProduct> repoBatchProduct, IProductService productService)
        {
            Repo = repo;
            RepoBatchProduct = repoBatchProduct;
            _productService = productService;
        }

        public IEnumerable<Batch> GetAll() => Repo.GetAll(artist => artist.IsDeleted == false).Value;

        //public void GetBatchList()
        //{
        //    var list  = Repo.GetAll(batch  => batch.IsDeleted == false).Value;
        //}
        
        
        public BatchDTO GetBatchById(int id)
        {
            var entity = Repo.GetById(id);
            var result = new BatchDTO().GetDTO(entity);
            result.batchProduct = RepoBatchProduct.GetAll(bp => bp.BatchId == id).Value.Include(bp => bp.Product).
                Select(pb => new BatchProductDTO().GetDTO(pb)).ToList();
            return result;
        }
        public List<BatchProductDTO> GetBatchProducts(int batchId)
        {
            var list = RepoBatchProduct.GetAll(bp=>bp.BatchId ==  batchId).Value.Include(bp=>bp.Product).Select(pb=> new BatchProductDTO().GetDTO(pb)).ToList();
            return list;
        }


        private Batch Add(Batch entity)
        {

            Repo.Insert(entity);
            Repo.Save();
            return entity;
        }

        
        private void AddBatchProducts(List<CreateBatchProductDTO>  batchProductDTOs , Batch batch)
        {
            var entities = batchProductDTOs.Select(dto => dto.GetEntity(batch)).ToList();
            RepoBatchProduct.InsertRange(entities);
            RepoBatchProduct.Save();
        }
        
        public void Create(CreateBatchDTO batchDTO)
        {
            var entity = batchDTO.GetEntity();

            entity.IsDeleted = false;
            entity.CreatedDate = DateTime.Now;
            //var program = requestDTO.GetEntity();
            var batch =  Add(entity);

            AddBatchProducts(batchDTO.batchProducts , batch);
        }

        public void Update(UpdateBatchDTO batchDTO)
        {

            RemoveBatchProducts(batchDTO.batchId);


            var entity = batchDTO.GetEntity();
            entity.UpdatedDate = DateTime.Now;
            Repo.Update(entity);
            Repo.Save();

           
            AddBatchProducts(batchDTO.batchProducts, entity);
        }

        public void Remove(Guid id)
        {

            var batch = Repo.GetById(id);
            batch.IsDeleted = true;
            Update(batch);
        }
        private void RemoveBatchProducts(int id)
        {
            var selectedList = RepoBatchProduct.GetAll(bp=>bp.BatchId == id).Value.ToList();
            RepoBatchProduct.DeleteRange(selectedList);
            RepoBatchProduct.Save();
        }
        public Batch GetById(Guid id)
        {
            var entity = Repo.GetById(id);
            //var result = new ArtistResultDTO().GetDTO(entity);
            return entity;
        }


       public BatchListDTO GetBatchesforProducts(BatchListDTO dto)
        {
            dto.Batches = GetAll().Select(batch=> new BatchDTO().GetDTO(batch)).OrderBy(b=>b.operationDate).ToList();


            dto.products = _productService.GetProducts((int)dto.pageSize,(int) dto.nextPage);

            dto.pageNumber++;
            dto.nextPage++;
            return dto;

        }


        //public SearchResultDTO Search(SearchRequestDTO requestDTO)
        //{
        //    var result = Repo.GetAll(brand => brand.Name.ToLower().Contains(requestDTO.Key.ToLower()) &&
        //    brand.CreatedDate >= requestDTO.FromDate &&
        //    brand.CreatedDate <= requestDTO.ToDate,
        //    numberLimit: requestDTO.NumberLimit,
        //    pageNo: requestDTO.Page
        //    );


        //    var count = new SearchResultDTO
        //    {
        //        artists = result.Value.ToList(),
        //        SearchResultCount = result.Key,
        //        NextPage = requestDTO.Page == 0 ? 0 : requestDTO.Page++
        //    };

        //    return count;
        //}

        private void Update(Batch entity)
        {
            var brand = Repo.GetById(entity.Id);
            entity.CreatedDate = brand.CreatedDate;
            Repo.Update(entity);
        }

        //public void Edit(ArtistDTO requestDTO)
        //{
        //    var brand = requestDTO.GetEntity();
        //    Update(brand);
        //}


    }
}
