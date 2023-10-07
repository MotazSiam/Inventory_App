using Inventory_App.DTO.BatchDTOs;
using Inventory_App.DTO.BillDTOs;
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
    public class BillController : Controller
    {
        private readonly IBillService _billService;
        public BillController(IBillService billService)
        {
            _billService = billService;
        }


        [HttpGet]
        public IEnumerable<Bill> GetAll()
        {
            var result = _billService.GetAll().ToArray();
            return result;
        }
        [HttpPost]
        public async Task<ActionResult> Create(CreateBillDTO request)
        {
            _billService.Create(request);
            return Ok();
        }

        [HttpGet("GetById")]
        public BillDTO GetById(int bill_Id)
        {
            var result = _billService.GetById(bill_Id);
            return result;
        }


        [HttpPut]
        public async Task<ActionResult> Update(UpdateBillDTO request)
        {
            _billService.Update(request);
            return Ok();
        }
    }
}
