using Microsoft.AspNetCore.Identity;

namespace Inventory_App.Entities
{
    public class User : IdentityUser
    {
        public bool Active { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
