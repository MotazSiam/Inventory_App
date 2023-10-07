namespace Inventory_App.Helpers
{
    public class HttpRequestHelper
    {
        private readonly IHttpContextAccessor HttpContextAccessor;
        private readonly SecurityJwtHelper SecurityJwt;

        /// <summary>
        /// Initiate dependancies.
        /// </summary>
        /// <param name="httpContextAccessor"></param>
        /// <param name="securityJwt"></param>
        public HttpRequestHelper(IHttpContextAccessor httpContextAccessor, SecurityJwtHelper securityJwt)
        {
            HttpContextAccessor = httpContextAccessor;
            SecurityJwt = securityJwt;
        }

        /// <summary>
        /// Get Bearer Access token.
        /// </summary>
        /// <returns></returns>
        public string GetUserAccessToken()
        {
            string authorization = HttpContextAccessor.HttpContext.Request.Headers["Authorization"];
            return authorization.Split(" ")[1];
        }

        /// <summary>
        /// Get User Id by access token.
        /// </summary>
        public string CurrentUserId
        {
            get => SecurityJwt.GetUserIdByAccessToken(GetUserAccessToken());
        }
    }
}
