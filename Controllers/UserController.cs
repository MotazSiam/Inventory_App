using Inventory_App.DTO.UserDTOs;
using Inventory_App.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Inventory_App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost("SignIn")]
        public async Task<ActionResult<ResultSignInDTO>> SignIn(SignInDTO request)
        {
           var result= await _userService.SginIn(request);   
            return Ok(result);
        }

        [HttpPost("Create")]
        public async Task<ActionResult<ResultSignInDTO>> Create(CreateUserDTO request)
        {
            await _userService.CreateUser(request);
            return Ok();
        }
    }
}
