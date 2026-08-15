namespace CyberpunkTcgVault.Api.DTOs
{
    public class LoginResponse
    {
        public bool RequiresTwoFactor { get; set; }

        public AuthUserResponse? User { get; set; }
    }
}
