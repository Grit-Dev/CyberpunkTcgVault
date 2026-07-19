using CyberpunkTcgVault.Api.Data;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Models;
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

        private readonly AppDbContext _context;
        private readonly IPasswordHasher<AppUser> _passwordHasher;
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext context,
            IPasswordHasher<AppUser> passwordHasher,
            IConfiguration configuration)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _configuration = configuration;
        }

        private string GenerateJwtToken(AppUser user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var jwtKey = _configuration["Jwt:Key"]
                ?? throw new InvalidOperationException("JWT key is not configured.");

            var securityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey));

            var credentials = new SigningCredentials(
                securityKey,
                SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterUserRequest request)
        {
            var userExists = await _context.Users
                .AnyAsync(user => user.UserName == request.UserName);

            if (userExists)
            {
                return Conflict("Username already exists.");
            }

            var user = new AppUser
            {
                UserName = request.UserName.Trim()
            };

            // No Password Saved - Its hashed and we only get back the Hash!
            user.PasswordHash = _passwordHasher.HashPassword(
                user,
                request.Password);

            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return StatusCode(
                StatusCodes.Status201Created,
                new { message = "User registered successfully." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUserRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(user => user.UserName == request.UserName);

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
