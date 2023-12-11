using Inventory_App.DTO.ProductDTOs;
using Inventory_App.Entities;
using Inventory_App.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Inventory_App.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService )
        {
            _productService = productService;
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody]CreateProductDTO request)
        {
            _productService.Create(request);
            return Ok();
        }
        [HttpGet("GetByBrand")]
        public IEnumerable<Product> GetByBrand(int id)
        {
            var result =_productService.GetByBrandId(id).ToArray();
            return result;

        }
        [HttpGet("GetByCategory")]
        public IEnumerable<Product> GetByCategory(int id)
        {
            var result = _productService.GetByCategoryId(id).ToArray();
            return result;

        }
        [HttpGet("GetByType")]
        public IEnumerable<Product> GetByType(int id)
        {
            var result = _productService.GetByTypeId(id).ToArray();
            return result;

        }

        [HttpGet]
        public IEnumerable<Product> GetAll()
        {
            var result = _productService.GetAll().ToArray();
            return result;
        }

        [HttpPut]
        public async Task<ActionResult> Edit([FromBody] UpdateProductDTO request)
        {
            _productService.Edit(request);  
            return Ok();
        }
        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            _productService.Remove(id);
            return Ok();
        }


        [HttpGet("GetById")]
        public ProductDTO GetById(int productId)
        {
            var res = _productService.GetById(productId);
            return res;
        }

        [HttpGet("GetProductByYear")]
         public List<ProductByYearDTO> GetProductByYear(int productId)
        {
            var result = _productService.GetProductByYear(productId);
            return result;
        }

        [HttpGet("GetSpareParts")]
        public List<ProductDTO> GetSpareParts(int productId)
        {
            var result = _productService.GetSparePartsByProductId(productId);
            return result;
        }

    }
}
