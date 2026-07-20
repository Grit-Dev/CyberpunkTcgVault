namespace CyberpunkTcgVault.Api.DTOs
{
    public class AuthUserResponse
    {
        public Guid UserId { get; set; }

        public string UserName { get; set; } = string.Empty;

        public string Role { get; set; } = string.Empty;
    }
}
