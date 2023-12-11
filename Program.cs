using Inventory_App.DAL;
using Inventory_App.Entities;
using Inventory_App.Helpers;
using Inventory_App.Interface;
using Inventory_App.Middlewares;
using Inventory_App.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddCors();

var connectionString = builder.Configuration.GetConnectionString("InventoryDB");

builder.Services.AddIdentityCore<User>(options => options.Password.RequireNonAlphanumeric = false).AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<DBContext>().AddDefaultTokenProviders(); ;


builder.Services.AddDbContext<DBContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

//var appSettingsSection = builder.Configuration.GetSection("AppSettings");
//builder.Services.Configure<SettingsHelper>(appSettingsSection);

//var appSettings = appSettingsSection.Get<SettingsHelper>();
//var key = Encoding.ASCII.GetBytes(appSettings.Secret);
//IConfiguration configuration = new ConfigurationBuilder()
//                            .AddJsonFile("appsettings.json")
//                            .Build();


//builder.Services.ConfigureApplicationCookie(options =>
//{
//    options.Cookie.HttpOnly = true;
//    options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
//    options.SlidingExpiration = true;
//}).Configure<SecurityStampValidatorOptions>(options =>
//{
//    options.ValidationInterval = TimeSpan.FromMinutes(2);
//});
var appSettingsSection = builder.Configuration.GetSection("AppSettings");
builder.Services.Configure<SettingsHelper>(appSettingsSection);

var appSettings = appSettingsSection.Get<SettingsHelper>();
var key = Encoding.ASCII.GetBytes(appSettings.Secret);

builder.Services.AddAuthentication(auth =>
{
    auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(option =>
{
    option.RequireHttpsMetadata = false;
    option.SaveToken = true;
    option.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});


builder.Services.AddAuthentication(x =>
{
    x.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
        .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme)
        .AddCookie(IdentityConstants.ApplicationScheme);

builder.Services.Configure<IdentityOptions>(options =>
{
    // Default Password settings.
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 1;
    options.Password.RequiredUniqueChars = 0;
    options.User.AllowedUserNameCharacters = null;

});
//builder.Services.AddScoped(typeof(SignInManager<User>), typeof(SignInManager<User>));
builder.Services.AddScoped(typeof(HttpClient), typeof(HttpClient));

builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped(typeof(IBrandService), typeof(BrandService));
builder.Services.AddScoped(typeof(IProductService), typeof(ProductService));
builder.Services.AddScoped(typeof(ICategoryService), typeof(CategoryService));
builder.Services.AddScoped(typeof(ITypeService), typeof(TypeService));
builder.Services.AddScoped(typeof(IBatchService), typeof(BatchService));
builder.Services.AddScoped(typeof(IUserService), typeof(UserService));



builder.Services.AddScoped(typeof(SignInManager<User>), typeof(SignInManager<User>));


builder.Services.AddSingleton<SecurityJwtHelper>();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddSingleton<HttpRequestHelper>();
builder.Services.AddHttpContextAccessor(); 
builder.Services.AddScoped(sp => sp.GetService<IHttpContextAccessor>().HttpContext.Session);

var app = builder.Build();

app.UseMiddleware<GlobalExceptionHandelingMeddleware>();
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(options =>
  options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
