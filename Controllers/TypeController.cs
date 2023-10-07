using Inventory_App.Entities;
using Inventory_App.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Inventory_App.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TypeController : Controller
    {
        private readonly ITypeService _typeService;
        public TypeController(ITypeService typeService)
        {
            _typeService = typeService;
        }

        [HttpPost]
        public async Task<ActionResult> Create(Entities.Type type)
        {
            _typeService.Create(type);
            return Ok();

        }

        [HttpGet]
        public IEnumerable<Entities.Type> GetAll()
        {
            var result = _typeService.GetAll().ToArray();
            return result;
        }
        [HttpPut]
        public async Task<ActionResult> Edit(Entities.Type type)
        {
              _typeService.Edit(type);
            return Ok();
        }

        [HttpGet("GetById")]
        public Entities.Type Get(int id)
        {
            var result = _typeService.GetById(id);
            return result;
        }

        [HttpGet("first")]
        public Entities.Type GetFirst()
        {
            var res = _typeService.GetAll().First();
            return res;
        }
    }
}
