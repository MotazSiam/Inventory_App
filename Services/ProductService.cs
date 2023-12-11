using Inventory_App.DTO.BatchDTOs;
using Inventory_App.DTO.ProductDTOs;
using Inventory_App.Entities;
using Inventory_App.Interface;
using Microsoft.EntityFrameworkCore;

namespace Inventory_App.Services
{
    public class ProductService : IProductService
    {

        private readonly IGenericRepository<Product> Repo;
        private readonly IGenericRepository<BatchProduct> _RepoBatchProduct;
        private readonly IGenericRepository<BillProduct> _RepoBillProduct;


        public ProductService(IGenericRepository<Product> repo, IGenericRepository<BatchProduct> repoBatchProduct, IGenericRepository<BillProduct> repoBillProduct)
        {
            Repo = repo;
            _RepoBatchProduct = repoBatchProduct;
            _RepoBillProduct = repoBillProduct;
        }

        public IEnumerable<Product> GetByBrandId(int brandId)
        {
           var result = Repo.GetAll(product => product.IsDeleted == false && product.brandId== brandId && product.IsSpare == false).Value.Include(p => p.Brand).Include(p => p.Category).Include(p => p.Type);
            return result;
        }
        public IEnumerable<Product> GetByCategoryId(int categoryId)
        {
            var result = Repo.GetAll(product => product.IsDeleted == false && product.CategoryId == categoryId && product.IsSpare == false).Value.Include(p => p.Brand).Include(p => p.Category).Include(p => p.Type);
            return result;
        }
        public IEnumerable<Product> GetByTypeId(int typeId)
        {
            var result = Repo.GetAll(product => product.IsDeleted == false && product.TypeId == typeId && product.IsSpare == false).Value.Include(p => p.Brand).Include(p => p.Category).Include(p => p.Type);
            return result;
        }
        public IEnumerable<Product> GetAll() => Repo.GetAll(product => product.IsDeleted == false && product.IsSpare == false).Value.Include(p=>p.Brand).Include(p=>p.Category).Include(p=>p.Type);

        private Product Add(Product entity)
        {
           
            entity.CreatedDate= DateTime.Now;

            Repo.Insert(entity);
            Repo.Save();
            return entity;
        }
        public void Edit(UpdateProductDTO productDTO)
        {
            var entity = productDTO.GetEntity();
            //update time
            Update(entity);
        }

        public void Create(CreateProductDTO product)
        {
            var entity = product.GetEntity();
           
            //var program = requestDTO.GetEntity();
            Add(entity);
        }

        public void Remove(int id)
        {
            var brand = Repo.GetById(id);
            brand.IsDeleted = true;
            Update(brand);
        }

        public ProductDTO GetById(int id)
        {
            if(id == 0)
            {
                throw new Exception("not exist");
            }
            var entity = Repo.GetById(id);
            var batchProducts = _RepoBatchProduct.GetAll(pb => pb.ProductId == id && !pb.IsDeleted).Value.Select(pb=> new BatchProductDTO().GetDTO(pb)).ToList();
            var result = new ProductDTO().GetDTO(entity);
            result.stockCount = CalculateProductCount(batchProducts, entity.StartStock);
            result.productByYearDTOs = GetProductByYear(id);
            result.batchProducts = batchProducts.ToList();

            return result;
        }
        public List<ProductDTO> GetProducts(int pageSize , int pageNumber)
        {
            var result = new List<ProductDTO>();
            var products = Repo.GetAll(product =>  product.IsSpare == false).Value;
      
            var pageProducts = products.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            foreach (var product in pageProducts.ToList())
            {
                var batchProducts = _RepoBatchProduct.GetAll(pb => pb.ProductId == product.Id && !pb.IsDeleted).Value.Select(pb => new BatchProductDTO().GetDTO(pb)).ToList();
                var productDto = new ProductDTO().GetDTO(product);
                productDto.stockCount = CalculateProductCount(batchProducts, product.StartStock);
                productDto.batchProducts = batchProducts;
                productDto.productByYearDTOs = GetProductByYear(product.Id);
                result.Add(productDto);
            }

            return result;

        }

        public List<ProductOperationDTO> ArrangeProductOperation(int productId)
        {
            var result = new List<ProductOperationDTO>();
            var batches = _RepoBatchProduct.GetAll(bp=>bp.ProductId == productId).Value.Select(bp => new ProductOperationDTO().GetDTOFromBatch(bp));
            var bills = _RepoBillProduct.GetAll(b=>b.ProductId == productId).Value.Select(b=>new ProductOperationDTO().GETDTOFromBill(b));
            result.AddRange(batches);
            result.AddRange(bills);
            result.OrderBy(r=>r.date);
            return result;
        }

        public int CalculateTotalCount(int productId, int startStock)
        {
            int sum = startStock;
            var operations = ArrangeProductOperation(productId);
            foreach (var op in operations)
            {
                if (op.opertionType == OpertionType.Delivery)
                {
                    sum = sum + op.count;
                }

                if (op.opertionType == OpertionType.Dispose)
                {
                    sum = sum - op.count;
                }
            }

            return sum;

        }


        private int CalculateProductCount(List<BatchProductDTO> batchProducts  , int startStock)
        {
            int sum = startStock;
            foreach(var batchProduct in batchProducts)
            {
                if(batchProduct.btachType == OpertionType.Delivery)
                {
                    sum = sum + batchProduct.count;
                }

                if(batchProduct.btachType == OpertionType.Dispose)
                {
                    sum = sum - batchProduct.count;
                }
            }

            return sum;
        }



        public List<ProductDTO> GetSparePartsByProductId(int productId)
        {
            var result =  Repo.GetAll(product=> product.SpareForProductId == productId).Value.Select(sp => new ProductDTO().GetDTO(sp)).ToList();
            return result;
        }

        public List<ProductByYearDTO> GetProductByYear( int productId)
        {
            int year =  DateTime.Now.Year - 9;
            var result = new List<ProductByYearDTO>();
            for(int i = 0; i<10; i++)
            {
              var batchProducts =   _RepoBatchProduct.GetAll(bp=>bp.ProductId == productId && bp.Year == year).Value.ToList();
                var dto = new ProductByYearDTO
                {
                    year = year.ToString(),
                    increaseCount = batchProducts.Where(bp => bp.BtachType == OpertionType.Delivery).Sum(bp => bp.Count),
                    decreaseCount = batchProducts.Where(bp => bp.BtachType == OpertionType.Dispose).Sum(bp => bp.Count)
                };
                year++;
                result.Add(dto);
            }

            return result;
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

        private void Update(Product entity)
        {
            //var product = Repo.GetById(entity.Id);
            //entity.CreatedDate = product.CreatedDate;
            Repo.Update(entity);
            Repo.Save();
        }

        //public void Edit(ArtistDTO requestDTO)
        //{
        //    var brand = requestDTO.GetEntity();
        //    Update(brand);
        //}

    }
}
