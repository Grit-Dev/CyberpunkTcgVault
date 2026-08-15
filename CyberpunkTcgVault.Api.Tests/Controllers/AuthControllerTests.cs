using CyberpunkTcgVault.Api.Controllers;
using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Options;
using CyberpunkTcgVault.Api.Security;
using CyberpunkTcgVault.Api.Services;
using CyberpunkTcgVault.Api.Services.Interfaces;
using CyberpunkTcgVault.Api.Tests.TestHelpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Security.Claims;
using FrameworkOptions = Microsoft.Extensions.Options.Options;

namespace CyberpunkTcgVault.Api.Tests.Controllers
{
    public class AuthControllerTests
    {
        [Fact]
        public async Task Register_WhenDetailsAreValid_CreatesUserWithUserRole()
        {
            // Arrange
            using var environment =
                await TestIdentityEnvironment.CreateAsync();

            var request = new RegisterUserRequest
            {
                UserName = "   paul   ",
                Email = "paul@example.com",
                Password = "Password123!"
            };

            // Act
            var result =
                await environment.Controller.Register(request);

            // Assert
            var created =
                Assert.IsType<ObjectResult>(result);

            Assert.Equal(
                StatusCodes.Status201Created,
                created.StatusCode);

            var user =
                await environment.UserManager
                    .FindByEmailAsync("paul@example.com");

            Assert.NotNull(user);

            Assert.Equal("paul", user.UserName);
            Assert.Equal("paul@example.com", user.Email);

            Assert.False(
                string.IsNullOrWhiteSpace(user.PasswordHash));

            Assert.NotEqual(
                "Password123!",
                user.PasswordHash);

            var passwordIsValid =
                await environment.UserManager.CheckPasswordAsync(
                    user,
                    "Password123!");

            Assert.True(passwordIsValid);

            var isUser =
                await environment.UserManager.IsInRoleAsync(
                    user,
                    AppRoles.User);

            Assert.True(isUser);
        }

        [Fact]
        public async Task Register_WhenUserNameIsAnEmailAddress_ReturnsBadRequest()
        {
            using var environment =
                await TestIdentityEnvironment.CreateAsync();

            var request = new RegisterUserRequest
            {
                UserName = "paul@example.com",
                Email = "paul@example.com",
                Password = "Password123!"
            };

            var result =
                await environment.Controller.Register(request);

            var badRequest =
                Assert.IsType<BadRequestObjectResult>(result);

            var problem =
                Assert.IsType<ValidationProblemDetails>(badRequest.Value);

            Assert.Equal(
                StatusCodes.Status400BadRequest,
                problem.Status);

            Assert.True(problem.Errors.ContainsKey("UserName"));
            Assert.Null(
                await environment.UserManager
                    .FindByEmailAsync("paul@example.com"));
        }

        [Fact]
        public async Task Register_WhenUserNameIsWhitespaceOnly_ReturnsBadRequest()
        {
            using var environment =
                await TestIdentityEnvironment.CreateAsync();

            var request = new RegisterUserRequest
            {
                UserName = "   ",
                Email = "paul@example.com",
                Password = "Password123!"
            };

            var result =
                await environment.Controller.Register(request);

            var badRequest =
                Assert.IsType<BadRequestObjectResult>(result);

            var problem =
                Assert.IsType<ValidationProblemDetails>(badRequest.Value);

            Assert.Equal(
                StatusCodes.Status400BadRequest,
                problem.Status);

            Assert.True(problem.Errors.ContainsKey("UserName"));
            Assert.Null(
                await environment.UserManager
                    .FindByEmailAsync("paul@example.com"));
        }

        [Fact]
        public async Task Register_WhenUserNameContainsWhitespace_ReturnsBadRequest()
        {
            using var environment =
                await TestIdentityEnvironment.CreateAsync();

            var request = new RegisterUserRequest
            {
                UserName = "paul mcginley",
                Email = "paul@example.com",
                Password = "Password123!"
            };

            var result =
                await environment.Controller.Register(request);

            var badRequest =
                Assert.IsType<BadRequestObjectResult>(result);

            var problem =
                Assert.IsType<ValidationProblemDetails>(badRequest.Value);

            Assert.True(problem.Errors.ContainsKey("UserName"));
        }

        [Fact]
        public async Task Register_WhenUserNameAlreadyExists_ReturnsConflict()
        {
            using var environment =
                await TestIdentityEnvironment.CreateAsync();

            var existingUser = new AppUser
            {
                UserName = "paul",
                Email = "first@example.com"
            };

            var createResult =
                await environment.UserManager.CreateAsync(
                    existingUser,
                    "Password123!");

            Assert.True(createResult.Succeeded);

            var request = new RegisterUserRequest
            {
                UserName = "paul",
                Email = "second@example.com",
                Password = "Password123!"
            };

            var result =
                await environment.Controller.Register(request);

            ProblemDetailsAssert.IsProblem(
                result,
                StatusCodes.Status409Conflict,
                "Account already exists.",
                "An account with those details already exists.");

            Assert.Null(
                await environment.UserManager
                    .FindByEmailAsync("second@example.com"));
        }

        [Fact]
        public async Task Register_WhenEmailAlreadyExists_ReturnsConflict()
        {
            using var environment =
                await TestIdentityEnvironment.CreateAsync();

            var existingUser = new AppUser
            {
                UserName = "paul-one",
                Email = "paul@example.com"
            };

            var createResult =
                await environment.UserManager.CreateAsync(
                    existingUser,
                    "Password123!");

            Assert.True(createResult.Succeeded);

            var request = new RegisterUserRequest
            {
                UserName = "paul-two",
                Email = "paul@example.com",
                Password = "Password123!"
            };

            var result =
                await environment.Controller.Register(request);

            ProblemDetailsAssert.IsProblem(
                result,
                StatusCodes.Status409Conflict,
                "Account already exists.",
                "An account with those details already exists.");

            Assert.Null(
                await environment.UserManager
                    .FindByNameAsync("paul-two"));
        }

        [Fact]
        public async Task Register_WhenAccountAlreadyExists_ReturnsConflict()
        {
            // Arrange
            using var environment =
                await TestIdentityEnvironment.CreateAsync();

            var existingUser = new AppUser
            {
                UserName = "paul",
                Email = "paul@example.com"
            };

            var createResult =
                await environment.UserManager.CreateAsync(
                    existingUser,
                    "Password123!");

            Assert.True(createResult.Succeeded);

            var request = new RegisterUserRequest
            {
                UserName = "paul",
                Email = "paul@example.com",
                Password = "Password123!"
            };

            // Act
            var result =
                await environment.Controller.Register(request);

            // Assert
            ProblemDetailsAssert.IsProblem(
                result,
                StatusCodes.Status409Conflict,
                "Account already exists.",
                "An account with those details already exists.");
        }

        [Fact]
        public async Task Register_WhenPublicRegistrationIsDisabled_ReturnsNotFound()
        {
            // Arrange
            using var environment =
                await TestIdentityEnvironment.CreateAsync(
                    publicRegistrationEnabled: false);

            var request = new RegisterUserRequest
            {
                UserName = "paul",
                Email = "paul@example.com",
                Password = "Password123!"
            };

            // Act
            var result =
                await environment.Controller.Register(request);

            // Assert
            ProblemDetailsAssert.IsProblem(
                result,
                StatusCodes.Status404NotFound,
                "Public registration is not available.");
        }

        [Fact]
        public async Task Login_WhenCredentialsAreValid_ReturnsCurrentUser()
        {
            // Arrange
            using var environment =
                await TestIdentityEnvironment.CreateAsync();

            var user = new AppUser
            {
                UserName = "paul-admin",
                Email = "paul@example.com"
            };

            var createResult =
                await environment.UserManager.CreateAsync(
                    user,
                    "Password123!");

            Assert.True(createResult.Succeeded);

            var roleResult =
                await environment.UserManager.AddToRoleAsync(
                    user,
                    AppRoles.Admin);

            Assert.True(roleResult.Succeeded);

            var request = new LoginUserRequest
            {
                Email = "paul@example.com",
                Password = "Password123!"
            };

            // Act
            var result =
                await environment.Controller.Login(request);

            // Assert
            var ok =
                Assert.IsType<OkObjectResult>(result.Result);

            var loginResponse =
                Assert.IsType<LoginResponse>(ok.Value);

            Assert.False(loginResponse.RequiresTwoFactor);
            Assert.NotNull(loginResponse.User);

            var response = loginResponse.User!;

            Assert.Equal(user.Id, response.UserId);
            Assert.Equal("paul-admin", response.UserName);
            Assert.Equal("paul@example.com", response.Email);

            Assert.Contains(
                AppRoles.Admin,
                response.Roles);
        }

        [Fact]
        public async Task Login_WhenEmailDoesNotExist_ReturnsUnauthorized()
        {
            // Arrange
            using var environment =
                await TestIdentityEnvironment.CreateAsync();

            var request = new LoginUserRequest
            {
                Email = "missing@example.com",
                Password = "Password123!"
            };

            // Act
            var result =
                await environment.Controller.Login(request);

            // Assert
            Assert.IsType<UnauthorizedObjectResult>(
                result.Result);
        }

        [Fact]
        public async Task Login_WhenPasswordIsInvalid_ReturnsUnauthorized()
        {
            // Arrange
            using var environment =
                await TestIdentityEnvironment.CreateAsync();

            var user = new AppUser
            {
                UserName = "paul",
                Email = "paul@example.com"
            };

            var createResult =
                await environment.UserManager.CreateAsync(
                    user,
                    "CorrectPassword123!");

            Assert.True(createResult.Succeeded);

            var request = new LoginUserRequest
            {
                Email = "paul@example.com",
                Password = "WrongPassword123!"
            };

            // Act
            var result =
                await environment.Controller.Login(request);

            // Assert
            Assert.IsType<UnauthorizedObjectResult>(
                result.Result);
        }

        [Fact]
        public async Task GetCurrentUser_WhenUserExists_ReturnsCurrentUser()
        {
            // Arrange
            using var environment =
                await TestIdentityEnvironment.CreateAsync();

            var user = new AppUser
            {
                UserName = "paul-admin",
                Email = "paul@example.com"
            };

            var createResult =
                await environment.UserManager.CreateAsync(
                    user,
                    "Password123!");

            Assert.True(createResult.Succeeded);

            var roleResult =
                await environment.UserManager.AddToRoleAsync(
                    user,
                    AppRoles.Admin);

            Assert.True(roleResult.Succeeded);

            environment.SetCurrentUser(user.Id);

            // Act
            var result =
                await environment.Controller.GetCurrentUser();

            // Assert
            var ok =
                Assert.IsType<OkObjectResult>(result.Result);

            var response =
                Assert.IsType<AuthUserResponse>(ok.Value);

            Assert.Equal(user.Id, response.UserId);
            Assert.Equal("paul-admin", response.UserName);
            Assert.Equal("paul@example.com", response.Email);

            Assert.Contains(
                AppRoles.Admin,
                response.Roles);
        }

        [Fact]
        public async Task GetCurrentUser_WhenUserDoesNotExist_ReturnsUnauthorized()
        {
            // Arrange
            using var environment =
                await TestIdentityEnvironment.CreateAsync();

            environment.SetCurrentUser(Guid.NewGuid());

            // Act
            var result =
                await environment.Controller.GetCurrentUser();

            // Assert
            Assert.IsType<UnauthorizedResult>(
                result.Result);
        }

        [Fact]
        public async Task GetCurrentUser_WhenNoUserIsAuthenticated_ReturnsUnauthorized()
        {
            // Arrange
            using var environment =
                await TestIdentityEnvironment.CreateAsync();

            // Act
            var result =
                await environment.Controller.GetCurrentUser();

            // Assert
            Assert.IsType<UnauthorizedResult>(
                result.Result);
        }

        [Fact]
        public async Task Logout_WhenCalled_ReturnsNoContent()
        {
            // Arrange
            using var environment =
                await TestIdentityEnvironment.CreateAsync();

            // Act
            var result =
                await environment.Controller.Logout();

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public void GetCurrentUser_HasAuthorizeAttribute()
        {
            // Arrange
            var methodInfo =
                typeof(AuthController)
                    .GetMethod(nameof(AuthController.GetCurrentUser));

            // Act
            var attributes =
                methodInfo!
                    .GetCustomAttributes(
                        typeof(AuthorizeAttribute),
                        inherit: true);

            // Assert
            Assert.NotNull(methodInfo);
            Assert.NotEmpty(attributes);
        }

        [Fact]
        public void Logout_HasAuthorizeAttribute()
        {
            // Arrange
            var methodInfo =
                typeof(AuthController)
                    .GetMethod(nameof(AuthController.Logout));

            // Act
            var attributes =
                methodInfo!
                    .GetCustomAttributes(
                        typeof(AuthorizeAttribute),
                        inherit: true);

            // Assert
            Assert.NotNull(methodInfo);
            Assert.NotEmpty(attributes);
        }

        private sealed class TestIdentityEnvironment : IDisposable
        {
            private readonly ServiceProvider _provider;
            private readonly IServiceScope _scope;

            public UserManager<AppUser> UserManager { get; }

            public AuthController Controller { get; }

            private HttpContext HttpContext { get; }

            private TestIdentityEnvironment(
                ServiceProvider provider,
                IServiceScope scope,
                UserManager<AppUser> userManager,
                AuthController controller,
                HttpContext httpContext)
            {
                _provider = provider;
                _scope = scope;
                UserManager = userManager;
                Controller = controller;
                HttpContext = httpContext;
            }

            public static async Task<TestIdentityEnvironment> CreateAsync(
                bool publicRegistrationEnabled = true)
            {
                var services = new ServiceCollection();

                services.AddLogging();
                services.AddHttpContextAccessor();
                services.AddControllers();

                services.AddDbContext<AppDbContext>(options =>
                    options.UseInMemoryDatabase(
                        Guid.NewGuid().ToString()));

                services
                    .AddIdentity<AppUser, IdentityRole<Guid>>(
                        options =>
                        {
                            options.SignIn.RequireConfirmedEmail = false;

                            options.User.RequireUniqueEmail = true;
                            options.User.AllowedUserNameCharacters =
                                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._+";

                            options.Password.RequiredLength = 8;
                            options.Password.RequireDigit = false;
                            options.Password.RequireLowercase = false;
                            options.Password.RequireUppercase = false;
                            options.Password.RequireNonAlphanumeric = false;
                            options.Password.RequiredUniqueChars = 1;

                            options.Lockout.AllowedForNewUsers = true;
                            options.Lockout.MaxFailedAccessAttempts = 5;
                            options.Lockout.DefaultLockoutTimeSpan =
                                TimeSpan.FromMinutes(15);
                        })
                    .AddEntityFrameworkStores<AppDbContext>()
                    .AddDefaultTokenProviders();

                // AuthController now depends on IDemoVaultService.
                // Register the real service in the test DI container so the
                // controller constructor matches the production controller.
                services.AddScoped<IDemoVaultService, DemoVaultService>();

                var provider =
                    services.BuildServiceProvider();

                var scope =
                    provider.CreateScope();

                var serviceProvider =
                    scope.ServiceProvider;

                var httpContextAccessor =
                    serviceProvider
                        .GetRequiredService<IHttpContextAccessor>();

                var httpContext =
                    new DefaultHttpContext
                    {
                        RequestServices = serviceProvider
                    };

                httpContextAccessor.HttpContext =
                    httpContext;

                var userManager =
                    serviceProvider
                        .GetRequiredService<UserManager<AppUser>>();

                var signInManager =
                    serviceProvider
                        .GetRequiredService<SignInManager<AppUser>>();

                signInManager.Context =
                    httpContext;

                var roleManager =
                    serviceProvider
                        .GetRequiredService<
                            RoleManager<IdentityRole<Guid>>>();

                await IdentitySeeder.SeedRolesAsync(
                    roleManager);

                var capabilityOptions =
                    FrameworkOptions.Create(
                        new ProductCapabilitiesOptions
                        {
                            PublicRegistrationEnabled =
                                publicRegistrationEnabled,

                            DemoAccessEnabled = true
                        });

                var demoVaultService =
                    serviceProvider
                        .GetRequiredService<IDemoVaultService>();

                var controller =
                    new AuthController(
                        userManager,
                        signInManager,
                        capabilityOptions,
                        demoVaultService)
                    {
                        ControllerContext =
                            new ControllerContext
                            {
                                HttpContext = httpContext
                            }
                    };

                return new TestIdentityEnvironment(
                    provider,
                    scope,
                    userManager,
                    controller,
                    httpContext);
            }

            public void SetCurrentUser(Guid userId)
            {
                var claims = new[]
                {
                    new Claim(
                        ClaimTypes.NameIdentifier,
                        userId.ToString())
                };

                HttpContext.User =
                    new ClaimsPrincipal(
                        new ClaimsIdentity(
                            claims,
                            "TestAuth"));
            }

            public void Dispose()
            {
                _scope.Dispose();
                _provider.Dispose();
            }
        }
    }
}