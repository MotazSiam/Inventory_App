using Inventory_App.Entities;
using Inventory_App.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Inventory_App.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class BrandController : ControllerBase
    {
        private readonly IBrandService _brandService;
        public BrandController (IBrandService brandService)
        {
            _brandService = brandService;
        }

        [HttpPost]
        public async Task<ActionResult> Create(Brand brand)
        {
            _brandService.Create(brand);
            return Ok();

        }
        [HttpPut]
        public async Task<ActionResult> Edit(Brand request)
        {
            _brandService.Edit(request);
            return Ok();
        }
        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            _brandService.Remove(id);
            return Ok();
        }
        [HttpGet("GetById")]
        public Brand Get(int id)
        {
            var result = _brandService.GetById(id);
            return result;
        }
        [HttpGet]
        public IEnumerable<Brand> GetAll()
        {
            var result = _brandService.GetAll().ToArray();
            return result;
        }
        
        [HttpGet("first")]
        public Brand GetFirst()
        {
            var res = _brandService.GetAll().First();
            return res;
        }

       
    }
}
