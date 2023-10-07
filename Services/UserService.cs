using Inventory_App.DTO.UserDTOs;
using Inventory_App.Entities;
using Inventory_App.Helpers;
using Inventory_App.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Inventory_App.Services
{
    public class UserService: IUserService
    {
        private readonly UserManager<User> UserManager;
        private readonly SignInManager<User> SignInManager;
        private readonly SecurityJwtHelper SecurityJwt;
        private HttpClient httpClient;

        public UserService(UserManager<User> userManager,
             SignInManager<User> signInManager,
             SecurityJwtHelper securityJwt,
             HttpClient _httpClient)
        {
            httpClient = _httpClient;
            SecurityJwt = securityJwt;
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public async Task<ResultSignInDTO> SginIn(SignInDTO request)
        {
            User user = await UserManager.Users.FirstOrDefaultAsync(user => user.Email == request.Email);


            var result = await SignInManager.PasswordSignInAsync(user, request.Password, true, false);

            if (!result.Succeeded)
            {
                throw new Exception("incorect password or user name");
              
            }

            var res = SecurityJwt.GetAccessTokenById(user.Id, "Admin");
            return res;
        }

        public async Task CreateUser(CreateUserDTO request)
        {
            try
            {
                User user = request.GetEntity();
                user.PhoneNumberConfirmed = true;
                user.EmailConfirmed = true;

                var result = UserManager.CreateAsync(user, request.password).Result;
                if (!result.Succeeded)
                {
                    throw new ValidationException("error");
                }
            }
            catch (Exception ex)
            {
                throw new ValidationException(ex.Message);
            }

     

        }
    }
}
