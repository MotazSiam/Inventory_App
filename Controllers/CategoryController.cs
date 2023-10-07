using Inventory_App.Entities;
using Inventory_App.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Inventory_App.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpPost]
        public async Task<ActionResult> Create(Category category)
        {
            _categoryService.Create(category);
            return Ok();

        }

        [HttpPut]
        public async Task<ActionResult> Edit(Category request)
        {
            _categoryService.Edit(request);
            return Ok();
        }
        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            _categoryService.Remove(id);
            return Ok();
        }
        [HttpGet("GetById")]
        public Category Get(int id)
        {
           var result =  _categoryService.GetById(id);
            return result;
        }

        [HttpGet]
        public IEnumerable<Category> GetAll()
        {
            var result = _categoryService.GetAll().ToArray();
            return result;
        }

        [HttpGet("first")]
        public Category GetFirst()
        {
            var res = _categoryService.GetAll().First();
            return res;
        }


    }
}
