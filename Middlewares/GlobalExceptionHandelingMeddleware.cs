namespace Inventory_App.Middlewares
{
    public class GlobalExceptionHandelingMeddleware
    {
        private readonly RequestDelegate _next;

        public GlobalExceptionHandelingMeddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception error)
            {
                var response = new
                {
                    Msg = error.Message
                };
                context.Response.StatusCode = 500;
                context.Response.ContentType = "application/json";  //add this line.....
                await context.Response.WriteAsJsonAsync(response);
                return;

            }
        }



    }
}
