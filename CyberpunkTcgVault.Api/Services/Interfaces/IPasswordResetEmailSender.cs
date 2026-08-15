namespace CyberpunkTcgVault.Api.Services.Interfaces
{
    public interface IPasswordResetEmailSender
    {
        Task SendPasswordResetAsync(
            string recipientEmail,
            string resetUrl,
            CancellationToken cancellationToken);
    }
}
