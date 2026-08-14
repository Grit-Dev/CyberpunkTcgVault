using System.Security.Claims;
using System.Threading.RateLimiting;
using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.ExceptionHandling;
using CyberpunkTcgVault.Api.HealthChecks;
using CyberpunkTcgVault.Api.Middleware;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Options;
using CyberpunkTcgVault.Api.Security;
using CyberpunkTcgVault.Api.Services;
using CyberpunkTcgVault.Api.Services.Interfaces;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

// Do not advertise the Kestrel server implementation in responses.
// Choom Vault currently accepts small JSON requests only, so keep the
// default request-body allowance deliberately small for the MVP.
builder.WebHost.ConfigureKestrel(options =>
{
    options.AddServerHeader = false;
    options.Limits.MaxRequestBodySize = 1_048_576;
});

// Registers AppDbContext so the API can connect to SQL Server.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// Bind product capability flags once and inject them through IOptions<T>.
builder.Services.Configure<ProductCapabilitiesOptions>(
    builder.Configuration.GetSection(
        ProductCapabilitiesOptions.SectionName));

// Registers ASP.NET Core Identity.
// AppUser is the user type.
// IdentityRole<Guid> gives us User / Demo / Admin roles.
// Identity stores its data through AppDbContext.
builder.Services
    .AddIdentity<AppUser, IdentityRole<Guid>>(options =>
    {
        // TODO: Introduce email confirmation before open public accounts.
        options.SignIn.RequireConfirmedEmail = false;

        options.User.RequireUniqueEmail = true;

        // Prefer long passwords/passphrases.
        options.Password.RequiredLength = 8;
        options.Password.RequireDigit = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequiredUniqueChars = 1;

        // Identity account lockout is separate from request rate limiting.
        options.Lockout.AllowedForNewUsers = true;
        options.Lockout.MaxFailedAccessAttempts = 5;
        options.Lockout.DefaultLockoutTimeSpan =
            TimeSpan.FromMinutes(15);
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

// Standard API error responses. Only a trace identifier is added to help
// match a client-side failure to server-side logs. Exception messages,
// stack traces and database details are never placed in the response.
builder.Services.AddProblemDetails(options =>
{
    options.CustomizeProblemDetails = context =>
    {
        context.ProblemDetails.Extensions["traceId"] =
            context.HttpContext.TraceIdentifier;
    };
});

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

// Health monitoring:
// /health checks that the API process is alive.
// /health/ready additionally verifies database connectivity.
builder.Services.AddHealthChecks()
    .AddCheck<DatabaseHealthCheck>(
        "database",
        tags: ["ready"]);

// A broad API safety limit plus stricter authentication limits.
// The global limiter uses the authenticated user ID when available and
// otherwise falls back to the connection IP address.
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode =
        StatusCodes.Status429TooManyRequests;

    options.GlobalLimiter =
        PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
        {
            var userId = httpContext.User.FindFirstValue(
                ClaimTypes.NameIdentifier);

            var partitionKey = !string.IsNullOrWhiteSpace(userId)
                ? $"user:{userId}"
                : $"ip:{GetClientIp(httpContext)}";

            return RateLimitPartition.GetFixedWindowLimiter(
                partitionKey,
                _ => new FixedWindowRateLimiterOptions
                {
                    PermitLimit = 300,
                    Window = TimeSpan.FromMinutes(1),
                    QueueLimit = 0,
                    QueueProcessingOrder =
                        QueueProcessingOrder.OldestFirst,
                    AutoReplenishment = true
                });
        });

    options.AddPolicy(
        RateLimitPolicyNames.Login,
        httpContext =>
            RateLimitPartition.GetFixedWindowLimiter(
                $"login:{GetClientIp(httpContext)}",
                _ => new FixedWindowRateLimiterOptions
                {
                    PermitLimit = 10,
                    Window = TimeSpan.FromMinutes(1),
                    QueueLimit = 0,
                    QueueProcessingOrder =
                        QueueProcessingOrder.OldestFirst,
                    AutoReplenishment = true
                }));

    options.AddPolicy(
        RateLimitPolicyNames.Registration,
        httpContext =>
            RateLimitPartition.GetFixedWindowLimiter(
                $"register:{GetClientIp(httpContext)}",
                _ => new FixedWindowRateLimiterOptions
                {
                    PermitLimit = 5,
                    Window = TimeSpan.FromMinutes(10),
                    QueueLimit = 0,
                    QueueProcessingOrder =
                        QueueProcessingOrder.OldestFirst,
                    AutoReplenishment = true
                }));

    options.OnRejected = async (context, cancellationToken) =>
    {
        if (context.Lease.TryGetMetadata(
                MetadataName.RetryAfter,
                out var retryAfter))
        {
            context.HttpContext.Response.Headers["Retry-After"] =
                Math.Ceiling(retryAfter.TotalSeconds).ToString();
        }

        var problemDetailsService =
            context.HttpContext.RequestServices
                .GetRequiredService<IProblemDetailsService>();

        var problemDetails = new ProblemDetails
        {
            Status = StatusCodes.Status429TooManyRequests,
            Title = "Too many requests."
        };

        var written = await problemDetailsService.TryWriteAsync(
            new ProblemDetailsContext
            {
                HttpContext = context.HttpContext,
                ProblemDetails = problemDetails
            });

        if (!written)
        {
            await context.HttpContext.Response.WriteAsJsonAsync(
                problemDetails,
                cancellationToken);
        }
    };
});

var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? [];

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "Frontend",
        policy =>
        {
            // No configured origins means cross-origin browser access is
            // denied by default rather than accidentally opened to everyone.
            if (allowedOrigins.Length > 0)
            {
                policy.WithOrigins(allowedOrigins)
                    .WithMethods(
                        "GET",
                        "POST",
                        "PUT",
                        "PATCH",
                        "DELETE")
                    .WithHeaders(
                        HeaderNames.Accept,
                        HeaderNames.ContentType,
                        "X-XSRF-TOKEN")
                    .AllowCredentials();
            }
        });
});

// Swagger/OpenAPI is available only in Development below.
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

// Central safe handling for unexpected exceptions.
app.UseExceptionHandler();

// Produces ProblemDetails bodies for otherwise empty error status codes.
app.UseStatusCodePages();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    // Tell supporting browsers to use HTTPS for subsequent requests.
    app.UseHsts();
}

app.UseHttpsRedirection();

// Static artwork is served before rate limiting so ordinary image loading
// does not consume API request permits.
app.UseStaticFiles();

app.UseRouting();

app.UseCors("Frontend");

// Authentication runs first so the global limiter can partition signed-in
// requests by user ID instead of only by IP address.
app.UseAuthentication();

// Security observability wraps the rate limiter/authorization middleware so
// blocked requests and important auth outcomes can be recorded server-side.
app.UseMiddleware<SecurityEventLoggingMiddleware>();

app.UseRateLimiter();

app.UseAuthorization();

app.MapControllers();

// Liveness: if this responds Healthy, the ASP.NET Core process is alive.
// No dependency checks are executed here.
app.MapHealthChecks(
        "/health",
        new HealthCheckOptions
        {
            Predicate = _ => false,
            ResponseWriter = HealthCheckResponseWriter.WriteAsync
        })
    .AllowAnonymous();

// Readiness: verifies that the API can also reach SQL Server.
app.MapHealthChecks(
        "/health/ready",
        new HealthCheckOptions
        {
            Predicate = check => check.Tags.Contains("ready"),
            ResponseWriter = HealthCheckResponseWriter.WriteAsync
        })
    .AllowAnonymous();

app.Run();

static string GetClientIp(HttpContext httpContext)
{
    return httpContext.Connection.RemoteIpAddress?.ToString()
        ?? "unknown";
}
