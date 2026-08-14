using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Services;
using CyberpunkTcgVault.Api.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

// Registers AppDbContext so the API can connect to SQL Server.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// Registers ASP.NET Core Identity.
// AppUser is user type.
// IdentityRole<Guid> gives us User / Demo / Admin roles.
// Identity stores its data through AppDbContext.
builder.Services
    .AddIdentity<AppUser, IdentityRole<Guid>>(options =>
    {
        // TODO: Introduce email confirmation before public accounts.
        options.SignIn.RequireConfirmedEmail = false;

        options.User.RequireUniqueEmail = true;

        // Prefer long passwords/passphrases.
        options.Password.RequiredLength = 8;
        options.Password.RequireDigit = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequiredUniqueChars = 1;

        // Identity sign-in attempts.
        options.Lockout.AllowedForNewUsers = true;
        options.Lockout.MaxFailedAccessAttempts = 5;
        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
    })
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddHttpContextAccessor();

// Application services are scoped because they use the scoped AppDbContext.
builder.Services.AddScoped<ICardService, CardService>();
builder.Services.AddScoped<IOwnedCardService, OwnedCardService>();
builder.Services.AddScoped<IWishListItemService, WishListItemService>();
builder.Services.AddScoped<ICollectionProductService, CollectionProductService>();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularDevelopment",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .WithMethods("GET", "POST", "PUT", "PATCH", "DELETE")
                  .WithHeaders(
                      HeaderNames.Accept,
                      HeaderNames.ContentType,
                      "X-XSRF-TOKEN")
                  .AllowCredentials();
        });
});

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Creates a service scope for startup-only work such as seeding.
using (var scope = app.Services.CreateScope())
{
    var dbContext =
        scope.ServiceProvider.GetRequiredService<AppDbContext>();

    var roleManager =
        scope.ServiceProvider
            .GetRequiredService<RoleManager<IdentityRole<Guid>>>();

    DbSeeder.Seed(dbContext);

    await IdentitySeeder.SeedRolesAsync(roleManager);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AngularDevelopment");

app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
