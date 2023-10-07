using Inventory_App.DTO.BatchDTOs;
using Inventory_App.DTO.BillDTOs;
using Inventory_App.Entities;
using Inventory_App.Interface;
using Microsoft.EntityFrameworkCore;

namespace Inventory_App.Services
{
    public class BillService: IBillService
    {
        private readonly IGenericRepository<Bill> Repo;
        private readonly IGenericRepository<BillProduct> RepoBillProduct;
        private readonly IProductService _productService;
        public BillService(IGenericRepository<Bill> repo, IGenericRepository<BillProduct> repoBillProduct, IProductService productService)
        {
            Repo = repo;
            RepoBillProduct = repoBillProduct;
            _productService = productService;
        }


        public IEnumerable<Bill> GetAll() => Repo.GetAll(artist => artist.IsDeleted == false).Value.Include(b=>b.Customer);


        private void AddBatchProducts(List<CreateBillProductDTO> billProductDTOs, Bill bill)
        {
            var entities = billProductDTOs.Select(dto => dto.GetEntity(bill)).ToList();
            RepoBillProduct.InsertRange(entities);
            RepoBillProduct.Save();
        }

        private Bill Add(Bill entity)
        {

            Repo.Insert(entity);
            Repo.Save();
            return entity;
        }
        public void Create(CreateBillDTO billDTO)
        {
            var entity = billDTO.GetEntity();

            entity.IsDeleted = false;
            entity.CreatedDate = DateTime.Now;
            //var program = requestDTO.GetEntity();
            var batch = Add(entity);

            AddBatchProducts(billDTO.billProducts, batch);
        }

        public BillDTO GetById(int id)
        {
            var entity = Repo.GetAll(b => b.Id == id && b.IsDeleted == false).Value.Include(b => b.Customer).FirstOrDefault() ;
            var result = new BillDTO().GetDTO(entity);
            result.billProducts = RepoBillProduct.GetAll(bp=>bp.BillId == id).Value.Include(bp=>bp.Product).Select(bp=> new BillProductDTO().GetDTO(bp)).ToList();
            return result;
        }

        public void Update(UpdateBillDTO billDTO)
        {

            RemoveBillProducts(billDTO.bill_Id);


            var entity = billDTO.GetEntity();
            entity.UpdatedDate = DateTime.Now;
            Repo.Update(entity);
            Repo.Save();


            AddBatchProducts(billDTO.billProducts, entity);
        }
        private void RemoveBillProducts(int id)
        {
            var selectedList = RepoBillProduct.GetAll(bp => bp.BillId == id).Value.ToList();
            RepoBillProduct.DeleteRange(selectedList);
            RepoBillProduct.Save();
        }

       

    }
}
