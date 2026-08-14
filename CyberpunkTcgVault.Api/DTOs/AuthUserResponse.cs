namespace CyberpunkTcgVault.Api.DTOs
{
    public class AuthUserResponse
    {
        public Guid UserId { get; set; }

        public string UserName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string[] Roles { get; set; } = [];

        public bool EmailConfirmed { get; set; }

        public bool TwoFactorEnabled { get; set; }
    }
}
