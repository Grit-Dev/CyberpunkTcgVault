using CyberpunkTcgVault.Api.Services.Interfaces;
using System.Security.Claims;

namespace CyberpunkTcgVault.Api.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public Guid GetUserId()
        {
            var userIdValue = _httpContextAccessor.HttpContext?
                .User
                .FindFirstValue(ClaimTypes.NameIdentifier);

            if (!Guid.TryParse(userIdValue, out var userId))
            {
                throw new InvalidOperationException(
                    "User ID claim was not found or was invalid.");
            }

            return userId;
        }
    }
}
