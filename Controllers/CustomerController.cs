using Inventory_App.Entities;
using Inventory_App.Interface;
using Inventory_App.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Inventory_App.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        private readonly ICustomerService _customerService;
        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }
        [HttpPost]
        public async Task<ActionResult> Create(Customer customer)
        {
            _customerService.Create(customer);
            return Ok();
        }
        [HttpPut]
        public async Task<ActionResult> Edit(Customer request)
        {
            _customerService.Edit(request);
            return Ok();
        }
        [HttpDelete]
        public async Task<ActionResult> Delete(Guid id)
        {
            _customerService.Remove(id);
            return Ok();
        }
        [HttpGet("GetById")]
        public Customer Get(Guid id)
        {
            var result = _customerService.GetById(id);
            return result;
        }
        [HttpGet]
        public IEnumerable<Customer> GetAll()
        {
            var result = _customerService.GetAll().ToArray();
            return result;
        }


    }
}
