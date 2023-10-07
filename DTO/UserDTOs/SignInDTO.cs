using Inventory_App.Entities;

namespace Inventory_App.DTO.UserDTOs
{
    public class SignInDTO
    {
        public string? Id { get; set; } = null;
        public string? UserName { get; set; } = null;
        public string Email { get; set; } = null;
        public string Password { get; set; } = null;

        public User GetEntity()
        {
            return new User
            {
                UserName = this.UserName,
                Email = this.Email,
                PasswordHash = this.Password,
                CreatedDate = DateTime.Now,

            };
        }
    }
}
