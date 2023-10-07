namespace Inventory_App.DTO.UserDTOs
{
    public class ResultSignInDTO
    {
        public string authToken { get; set; }
        public DateTime expiresIn { get; set; }
        //public string userType { get; set; }
        //public string userName { get; set; }
        //public string? phoneNumber { get; set; }
        //public string email { get; set; }
    }
}
