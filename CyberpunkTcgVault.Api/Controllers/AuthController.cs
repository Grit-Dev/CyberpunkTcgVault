using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CyberpunkTcgVault.Api.Controllers

{
    [ApiController]
    [Route("api/[Controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;

        private readonly SignInManager<AppUser> _signInManager;

        public AuthController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        private async Task<AuthUserResponse> CreateAuthUserResponse(
            AppUser user)
        {
            var roles = await _userManager.GetRolesAsync(user);

            return new AuthUserResponse
            {
                UserId = user.Id,
                UserName = user.UserName ?? string.Empty,
                Email = user.Email ?? string.Empty,
                Roles = roles.ToArray(),
                EmailConfirmed = user.EmailConfirmed,
                TwoFactorEnabled = user.TwoFactorEnabled
            };
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<AuthUserResponse>> GetCurrentUser(CancellationToken cancellationToken)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user is null)
            {
                return Unauthorized();
            }

            if (user == null)
            {
                return Unauthorized();
            }

            var response = await CreateAuthUserResponse(user);

            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterUserRequest request, CancellationToken cancellationToken)
        {
            var userExists = await _context.Users
                .AnyAsync(user => user.UserName == request.UserName, cancellationToken);

            if (userExists)
            {
                return Conflict("Username already exists.");
            }

            var user = new AppUser
            {
                UserName = request.UserName.Trim(),
                Role = "User"
            };

            // No Password Saved - Its hashed and we only get back the Hash!
            user.PasswordHash = _passwordHasher.HashPassword(
                user,
                request.Password);

            _context.Users.Add(user);

            await _context.SaveChangesAsync(cancellationToken);

            return StatusCode(
                StatusCodes.Status201Created,
                new { message = "User registered successfully." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUserRequest request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(user => user.UserName == request.UserName, cancellationToken);

            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            var passwordResult = _passwordHasher.VerifyHashedPassword(
                user,
                user.PasswordHash,
                request.Password);

            if (passwordResult == PasswordVerificationResult.Failed)
            {
                return Unauthorized("Invalid username or password.");
            }

            var token = GenerateJwtToken(user);

            return Ok(new
            {
                token
            });
        }
    }
}
