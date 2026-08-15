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
using Microsoft.AspNetCore.Authentication.Cookies;
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

// Bind product capability flags and Demo account configuration once.
builder.Services.Configure<ProductCapabilitiesOptions>(
    builder.Configuration.GetSection(
        ProductCapabilitiesOptions.SectionName));

builder.Services.Configure<DemoUserOptions>(
    builder.Configuration.GetSection(
        DemoUserOptions.SectionName));

builder.Services.Configure<MfaOptions>(
    builder.Configuration.GetSection(
        MfaOptions.SectionName));

builder.Services.Configure<PasswordResetOptions>(
    builder.Configuration.GetSection(
        PasswordResetOptions.SectionName));

// Registers ASP.NET Core Identity.
builder.Services
    .AddIdentity<AppUser, IdentityRole<Guid>>(options =>
    {
        // MVP registration does not yet include an email-delivery/confirmation
        // flow. Require confirmed email when public production registration is
        // opened with a real mail provider.
        options.SignIn.RequireConfirmedEmail = false;

        options.User.RequireUniqueEmail = true;

        // Public account handles are deliberately separate from email
        // addresses. Keep Identity's validator aligned with the explicit
        // registration rule enforced by AuthController.
        options.User.AllowedUserNameCharacters =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._+";

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

// Password-reset links are deliberately short-lived. This applies to the
// built-in ASP.NET Core Identity data-protection token provider.
builder.Services.Configure<DataProtectionTokenProviderOptions>(options =>
{
    options.TokenLifespan = TimeSpan.FromMinutes(30);
});

// Browser authentication uses the Identity application cookie. The cookie
// itself is never readable by Angular/JavaScript.
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.Name = "__Host-ChoomVault.Auth";
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.SameSite =
    Microsoft.AspNetCore.Http.SameSiteMode.None;
    options.Cookie.Path = "/";

    options.SlidingExpiration = true;
    options.ExpireTimeSpan = TimeSpan.FromHours(8);

    // APIs must return status codes, not HTML redirect responses. This keeps
    // Angular's 401/403 handling stable regardless of framework defaults.
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        return Task.CompletedTask;
    };

    options.Events.OnRedirectToAccessDenied = context =>
    {
        context.Response.StatusCode = StatusCodes.Status403Forbidden;
        return Task.CompletedTask;
    };
});

// The first password step of an MFA login uses Identity's temporary
// two-factor cookie. Configure it for the same credentialed browser flow as
// the application cookie so Angular can complete MFA across the API origin.
builder.Services.Configure<CookieAuthenticationOptions>(
    IdentityConstants.TwoFactorUserIdScheme,
    options =>
    {
        options.Cookie.Name = "__Host-ChoomVault.TwoFactor";
        options.Cookie.HttpOnly = true;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.Cookie.SameSite =
            Microsoft.AspNetCore.Http.SameSiteMode.None;
        options.Cookie.Path = "/";
        options.ExpireTimeSpan = TimeSpan.FromMinutes(5);
        options.SlidingExpiration = false;
    });

// Double-submit-style browser protection. The antiforgery cookie remains
// HttpOnly; Angular receives only the request token from GET /api/Auth/csrf
// and sends that value back in the X-XSRF-TOKEN header.
builder.Services.AddAntiforgery(options =>
{
    options.HeaderName = "X-XSRF-TOKEN";
    options.Cookie.Name = "__Host-ChoomVault.Antiforgery";
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.SameSite =
    Microsoft.AspNetCore.Http.SameSiteMode.None;
    options.Cookie.Path = "/";
});

builder.Services.AddAuthorization(AuthorizationConfiguration.Configure);

// Validate antiforgery tokens automatically for every unsafe MVC method
// (POST / PUT / PATCH / DELETE). GET/HEAD/OPTIONS/TRACE remain safe-method
// requests and don't require a token.
builder.Services.AddControllersWithViews(options =>
{
    options.Filters.Add(
        new AutoValidateAntiforgeryTokenAttribute());
});

builder.Services.AddHttpContextAccessor();

// Application services are scoped because they use the scoped AppDbContext.
builder.Services.AddScoped<ICardService, CardService>();
builder.Services.AddScoped<IOwnedCardService, OwnedCardService>();
builder.Services.AddScoped<IWishListItemService, WishListItemService>();
builder.Services.AddScoped<ICollectionProductService, CollectionProductService>();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();
builder.Services.AddScoped<IDemoVaultService, DemoVaultService>();

builder.Services.AddHttpClient<
    IPasswordResetEmailSender,
    ResendPasswordResetEmailSender>();

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

    options.AddPolicy(
        RateLimitPolicyNames.PasswordReset,
        httpContext =>
            RateLimitPartition.GetFixedWindowLimiter(
                $"password-reset:{GetClientIp(httpContext)}",
                _ => new FixedWindowRateLimiterOptions
                {
                    PermitLimit = 5,
                    Window = TimeSpan.FromMinutes(15),
                    QueueLimit = 0,
                    QueueProcessingOrder =
                        QueueProcessingOrder.OldestFirst,
                    AutoReplenishment = true
                }));

    options.AddPolicy(
        RateLimitPolicyNames.Demo,
        httpContext =>
            RateLimitPartition.GetFixedWindowLimiter(
                $"demo:{GetClientIp(httpContext)}",
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
        RateLimitPolicyNames.Mfa,
        httpContext =>
            RateLimitPartition.GetFixedWindowLimiter(
                $"mfa:{GetClientIp(httpContext)}",
                _ => new FixedWindowRateLimiterOptions
                {
                    PermitLimit = 10,
                    Window = TimeSpan.FromMinutes(5),
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

// Creates a service scope for startup-only role/reference/demo seeding.
using (var scope = app.Services.CreateScope())
{
    var dbContext =
        scope.ServiceProvider.GetRequiredService<AppDbContext>();

    var roleManager =
        scope.ServiceProvider
            .GetRequiredService<RoleManager<IdentityRole<Guid>>>();

    var userManager =
        scope.ServiceProvider
            .GetRequiredService<UserManager<AppUser>>();

    var capabilities = builder.Configuration
        .GetSection(ProductCapabilitiesOptions.SectionName)
        .Get<ProductCapabilitiesOptions>() ?? new();

    var demoUserOptions = builder.Configuration
        .GetSection(DemoUserOptions.SectionName)
        .Get<DemoUserOptions>() ?? new();

    // Local development should be immediately usable by Angular: apply the
    // checked-in EF migrations and seed the small reference catalogue.
    // Production migrations/data loading remain an explicit deployment step.
    if (app.Environment.IsDevelopment())
    {
        await dbContext.Database.MigrateAsync();
        DbSeeder.Seed(dbContext);
    }

    await IdentitySeeder.SeedRolesAsync(roleManager);

    var demoUser = await IdentitySeeder.SeedDemoUserAsync(
        userManager,
        capabilities,
        demoUserOptions);

    if (demoUser is not null)
    {
        var demoVaultService =
            scope.ServiceProvider.GetRequiredService<IDemoVaultService>();

        // Every application start begins with a known Demo Vault baseline.
        await demoVaultService.ResetDemoCollectorDataAsync(demoUser.Id);
    }
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
    app.UseHsts();
}

app.UseHttpsRedirection();

// Static artwork is served before rate limiting so ordinary image loading
// does not consume API request permits.
app.UseStaticFiles();

app.UseRouting();

// Credentialed browser access is allowed only from explicitly configured
// frontend origins. Production starts with no allowed cross-origin frontend
// until deployment configuration supplies the real origin.
app.UseCors("Frontend");

// Authentication runs first so the global limiter can partition signed-in
// requests by user ID instead of only by IP address.
app.UseAuthentication();

// Security observability wraps the limiter/authorization middleware so
// blocked requests and important auth outcomes can be recorded server-side.
app.UseMiddleware<SecurityEventLoggingMiddleware>();

app.UseRateLimiter();

app.UseAuthorization();

app.MapControllers();

// Liveness: if this responds Healthy, the ASP.NET Core process is alive.
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

// Exposed for integration tests. Top-level application behaviour is unchanged.
public partial class Program { }
