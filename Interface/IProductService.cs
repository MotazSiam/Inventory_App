using BanArab_App.DTO.ProductDTOs;
using Inventory_App.DTO.ProductDTOs;
using Inventory_App.Entities;
using Inventory_App.Services;

namespace Inventory_App.Interface
{
    public interface IProductService
    {
        public IEnumerable<Product> GetAll();
        public void Create(CreateProductDTO product);
        public void Remove(int id);
        public ProductDTO GetById(int id);
        public List<ProductDTO> GetProducts(int pageSize, int pageNumber);
        public List<ProductByYearDTO> GetProductByYear(int productId);
        public void Edit(UpdateProductDTO productDTO);

        public IEnumerable<Product> GetByTypeId(int typeId);
        public IEnumerable<Product> GetByBrandId(int brandId);
        public IEnumerable<Product> GetByCategoryId(int categoryId);

        public List<ProductDTO> GetSparePartsByProductId(string keyword);
        public  Task<string> UploadImage(ImageObj upload);

        public List<Product> searchProduct(RequestSearchProductDTO searchDto);
    }
}
