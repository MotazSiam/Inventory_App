using Inventory_App.DTO.BatchDTOs;
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

    public class BatchController : Controller
    {
        private readonly IBatchService _batchService;
        public BatchController(IBatchService batchService)
        {
            _batchService = batchService;
        }

        [HttpPost]

        public async Task<ActionResult> Create(CreateBatchDTO request)
        {
            _batchService.Create(request);
            return Ok();

        }

        [HttpGet("GetById")]
        public BatchDTO GetBatchById(int id)
        {
            var result = _batchService.GetBatchById(id);
            return result;
        } 
        /// <summary>
        /// 
        /// </summary>
        /// <param name="reuqest"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<ActionResult> Edit(UpdateBatchDTO reuqest)
        {
            _batchService.Update(reuqest);
            return Ok();
        }

        [HttpGet]
        public IEnumerable<Batch> GetAll()
        {
            var result = _batchService.GetAll().ToArray();
            return result;
        }
        [HttpGet("Products")]
        public List<BatchProductDTO> GetBatchProductsByBatchId(int batchId)
        {
            var result = _batchService.GetBatchProducts(batchId).ToList();
            return result;
        }
        [HttpPost("GetProductsBatches")]

        public BatchListDTO GetBatchesforProducts(BatchListDTO request)
        {
            var result = _batchService.GetBatchesforProducts(request);
            return result;
        }

    }
}
