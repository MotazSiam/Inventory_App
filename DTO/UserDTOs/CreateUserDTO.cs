using Inventory_App.Entities;
using System.Reflection;

namespace Inventory_App.DTO.UserDTOs
{
    public class CreateUserDTO
    {
        public string userName { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public User GetEntity()
        {
            return new User
            {
                UserName = userName,
                Email = email,
                CreatedDate = DateTime.UtcNow
            };
        }
    }
}
