using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Encodings.Web;
using CyberpunkTcgVault.Api.Options;
using CyberpunkTcgVault.Api.Services.Interfaces;
using Microsoft.Extensions.Options;

namespace CyberpunkTcgVault.Api.Services
{
    public sealed class ResendPasswordResetEmailSender
        : IPasswordResetEmailSender
    {
        private readonly HttpClient _httpClient;
        private readonly PasswordResetOptions _options;
        private readonly ILogger<ResendPasswordResetEmailSender> _logger;

        public ResendPasswordResetEmailSender(
            HttpClient httpClient,
            IOptions<PasswordResetOptions> options,
            ILogger<ResendPasswordResetEmailSender> logger)
        {
            _httpClient = httpClient;
            _options = options.Value;
            _logger = logger;
        }

        public async Task SendPasswordResetAsync(
            string recipientEmail,
            string resetUrl,
            CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(_options.ResendApiKey) ||
                string.IsNullOrWhiteSpace(_options.FromEmail))
            {
                throw new InvalidOperationException(
                    "Password reset email delivery is not configured.");
            }

            var safeResetUrl = HtmlEncoder.Default.Encode(resetUrl);

            using var request = new HttpRequestMessage(
                HttpMethod.Post,
                "https://api.resend.com/emails");

            request.Headers.Authorization =
                new AuthenticationHeaderValue(
                    "Bearer",
                    _options.ResendApiKey);

            request.Content = JsonContent.Create(new
            {
                from = _options.FromEmail,
                to = new[] { recipientEmail },
                subject = "Reset your Choom Vault password",
                text =
                    $"Reset your Choom Vault password using this link: {resetUrl}\n\n" +
                    "If you did not request this, you can ignore this email.",
                html =
                    "<p>Someone requested a password reset for your Choom Vault account.</p>" +
                    $"<p><a href=\"{safeResetUrl}\">Reset your password</a></p>" +
                    "<p>If you did not request this, you can ignore this email.</p>"
            });

            using var response = await _httpClient.SendAsync(
                request,
                cancellationToken);

            if (response.IsSuccessStatusCode)
            {
                return;
            }

            _logger.LogError(
                "Password reset email provider returned status code {StatusCode}.",
                (int)response.StatusCode);

            throw new InvalidOperationException(
                "Password reset email delivery failed.");
        }
    }
}
