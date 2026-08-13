using CyberpunkTcgVault.Api.Controllers;
using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Tests.TestHelpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace CyberpunkTcgVault.Api.Tests.Controllers
{
    public class AuthControllerTests
    {
        private static IConfiguration CreateConfiguration()
        {
            var settings = new Dictionary<string, string?>
            {
                ["Jwt:Key"] = "this-is-a-test-jwt-key-that-is-at-least-32-characters-long",
                ["Jwt:Issuer"] = "CyberpunkTcgVault.Api",
                ["Jwt:Audience"] = "CyberpunkTcgVault.Client"
            };

            return new ConfigurationBuilder()
                .AddInMemoryCollection(settings)
                .Build();
        }

        private static AuthController CreateController(
            AppDbContext context,
            IPasswordHasher<AppUser>? passwordHasher = null,
            Guid? userId = null,
            string? rawUserIdClaim = null)
        {
            var controller = new AuthController(
                context,
                passwordHasher ?? new PasswordHasher<AppUser>(),
                CreateConfiguration());

            var claims = new List<Claim>();

            if (userId.HasValue)
            {
                claims.Add(new Claim(ClaimTypes.NameIdentifier, userId.Value.ToString()));
            }

            if (rawUserIdClaim != null)
            {
                claims.Add(new Claim(ClaimTypes.NameIdentifier, rawUserIdClaim));
            }

            controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = new ClaimsPrincipal(new ClaimsIdentity(claims, "TestAuth"))
                }
            };

            return controller;
        }

        private static AppUser CreateTestUser(string userName = "test-user", string role = "User")
        {
            return new AppUser
            {
                Id = Guid.NewGuid(),
                UserName = userName,
                Role = role,
                PasswordHash = string.Empty
            };
        }

        private static string GetTokenFromOkResult(OkObjectResult okResult)
        {
            var tokenProperty = okResult.Value!
                .GetType()
                .GetProperty("token");

            Assert.NotNull(tokenProperty);

            var token = tokenProperty!.GetValue(okResult.Value) as string;

            Assert.False(string.IsNullOrWhiteSpace(token));

            return token!;
        }

        [Fact]
        public async Task Register_WhenUsernameDoesNotExist_CreatesUserWithUserRole()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var passwordHasher = new PasswordHasher<AppUser>();
            var controller = CreateController(context, passwordHasher);

            var request = new RegisterUserRequest
            {
                UserName = "   paul   ",
                Password = "Password123!"
            };

            // Act
            var result = await controller.Register(request, CancellationToken.None);

            // Assert
            var created = Assert.IsType<ObjectResult>(result);

            Assert.Equal(StatusCodes.Status201Created, created.StatusCode);

            var user = Assert.Single(context.Users);

            Assert.Equal("paul", user.UserName);
            Assert.Equal("User", user.Role);
            Assert.NotEqual("Password123!", user.PasswordHash);
            Assert.False(string.IsNullOrWhiteSpace(user.PasswordHash));

            var passwordResult = passwordHasher.VerifyHashedPassword(
                user,
                user.PasswordHash,
                "Password123!");

            Assert.Equal(PasswordVerificationResult.Success, passwordResult);
        }

        [Fact]
        public async Task Register_WhenUsernameAlreadyExists_ReturnsConflict()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var existingUser = CreateTestUser("paul");
            existingUser.PasswordHash = "hashed-password";

            context.Users.Add(existingUser);
            await context.SaveChangesAsync();

            var controller = CreateController(context);

            var request = new RegisterUserRequest
            {
                UserName = "paul",
                Password = "Password123!"
            };

            // Act
            var result = await controller.Register(request, CancellationToken.None);

            // Assert
            Assert.IsType<ConflictObjectResult>(result);
        }

        [Fact]
        public async Task Login_WhenCredentialsAreValid_ReturnsJwtToken()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var passwordHasher = new PasswordHasher<AppUser>();

            var user = CreateTestUser("paul-admin", "Admin");
            user.PasswordHash = passwordHasher.HashPassword(user, "Password123!");

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var controller = CreateController(context, passwordHasher);

            var request = new LoginUserRequest
            {
                UserName = "paul-admin",
                Password = "Password123!"
            };

            // Act
            var result = await controller.Login(request, CancellationToken.None);

            // Assert
            var ok = Assert.IsType<OkObjectResult>(result);

            var token = GetTokenFromOkResult(ok);

            var jwt = new JwtSecurityTokenHandler().ReadJwtToken(token);

            Assert.Contains(jwt.Claims, claim =>
                (claim.Type == ClaimTypes.NameIdentifier || claim.Type == "nameid") &&
                claim.Value == user.Id.ToString());

            Assert.Contains(jwt.Claims, claim =>
                (claim.Type == ClaimTypes.Name || claim.Type == "unique_name" || claim.Type == "name") &&
                claim.Value == "paul-admin");

            Assert.Contains(jwt.Claims, claim =>
                (claim.Type == ClaimTypes.Role || claim.Type == "role") &&
                claim.Value == "Admin");
        }

        [Fact]
        public async Task Login_WhenUsernameDoesNotExist_ReturnsUnauthorized()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var controller = CreateController(context);

            var request = new LoginUserRequest
            {
                UserName = "missing-user",
                Password = "Password123!"
            };

            // Act
            var result = await controller.Login(request, CancellationToken.None);

            // Assert
            Assert.IsType<UnauthorizedObjectResult>(result);
        }

        [Fact]
        public async Task Login_WhenPasswordIsInvalid_ReturnsUnauthorized()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var passwordHasher = new PasswordHasher<AppUser>();

            var user = CreateTestUser("paul", "User");
            user.PasswordHash = passwordHasher.HashPassword(user, "CorrectPassword123!");

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var controller = CreateController(context, passwordHasher);

            var request = new LoginUserRequest
            {
                UserName = "paul",
                Password = "WrongPassword123!"
            };

            // Act
            var result = await controller.Login(request, CancellationToken.None);

            // Assert
            Assert.IsType<UnauthorizedObjectResult>(result);
        }

        [Fact]
        public async Task GetCurrentUser_WhenUserClaimIsValid_ReturnsCurrentUser()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var user = CreateTestUser("paul-admin", "Admin");
            user.PasswordHash = "hashed-password";

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var controller = CreateController(context, userId: user.Id);

            // Act
            var result = await controller.GetCurrentUser(CancellationToken.None);

            // Assert
            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var response = Assert.IsType<AuthUserResponse>(ok.Value);

            Assert.Equal(user.Id, response.UserId);
            Assert.Equal("paul-admin", response.UserName);
            Assert.Equal("Admin", response.Role);
        }

        [Fact]
        public async Task GetCurrentUser_WhenUserClaimIsInvalid_ReturnsUnauthorized()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var controller = CreateController(context, rawUserIdClaim: "not-a-guid");

            // Act
            var result = await controller.GetCurrentUser(CancellationToken.None);

            // Assert
            Assert.IsType<UnauthorizedResult>(result.Result);
        }

        [Fact]
        public async Task GetCurrentUser_WhenUserDoesNotExist_ReturnsUnauthorized()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();

            var missingUserId = Guid.NewGuid();

            var controller = CreateController(context, userId: missingUserId);

            // Act
            var result = await controller.GetCurrentUser(CancellationToken.None);

            // Assert
            Assert.IsType<UnauthorizedResult>(result.Result);
        }

        [Fact]
        public void GetCurrentUser_HasAuthorizeAttribute()
        {
            // Arrange
            var methodInfo = typeof(AuthController).GetMethod(nameof(AuthController.GetCurrentUser));

            // Act
            var attributes = methodInfo!
                .GetCustomAttributes(typeof(AuthorizeAttribute), inherit: true);

            // Assert
            Assert.NotNull(methodInfo);
            Assert.NotEmpty(attributes);
        }
    }
}