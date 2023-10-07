using Inventory_App.DTO.UserDTOs;

namespace Inventory_App.Interface
{
    public interface IUserService
    {
        public  Task CreateUser(CreateUserDTO request);
        public  Task<ResultSignInDTO> SginIn(SignInDTO request);
    }
}
