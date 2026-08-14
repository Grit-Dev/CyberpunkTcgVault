using System.Security.Claims;
using CyberpunkTcgVault.Api.Security;

namespace CyberpunkTcgVault.Api.Middleware
{
    /// <summary>
    /// Logs a small set of security-relevant outcomes without recording
    /// credentials, cookies, tokens, request bodies or other sensitive data.
    /// </summary>
    public class SecurityEventLoggingMiddleware
    {
        private const string LoginPath = "/api/Auth/login";
        private const string RegisterPath = "/api/Auth/register";

        private readonly RequestDelegate _next;
        private readonly ILogger<SecurityEventLoggingMiddleware> _logger;

        public SecurityEventLoggingMiddleware(
            RequestDelegate next,
            ILogger<SecurityEventLoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            await _next(context);

            var statusCode = context.Response.StatusCode;

            // Request/user-derived values are sanitized before logging so a
            // malicious caller cannot inject new lines into security logs.
            var method = SanitizeForLog(context.Request.Method);
            var path = SanitizeForLog(
                context.Request.Path.Value ?? string.Empty);
            var clientIp = SanitizeForLog(GetClientIp(context));
            var userId = SanitizeForLog(
                context.User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? "anonymous");
            var traceId = SanitizeForLog(context.TraceIdentifier);

            if (statusCode == StatusCodes.Status429TooManyRequests)
            {
                _logger.LogWarning(
                    SecurityLogEvents.RateLimitExceeded,
                    "Security event: rate limit exceeded for {Method} {Path}. ClientIp: {ClientIp}. UserId: {UserId}. TraceId: {TraceId}.",
                    method,
                    path,
                    clientIp,
                    userId,
                    traceId);

                return;
            }

            if (IsPostTo(path, method, LoginPath))
            {
                if (statusCode == StatusCodes.Status401Unauthorized)
                {
                    _logger.LogWarning(
                        SecurityLogEvents.LoginFailed,
                        "Security event: login failed. ClientIp: {ClientIp}. TraceId: {TraceId}.",
                        clientIp,
                        traceId);
                }
                else if (statusCode == StatusCodes.Status200OK)
                {
                    _logger.LogInformation(
                        SecurityLogEvents.LoginSucceeded,
                        "Security event: login succeeded. ClientIp: {ClientIp}. TraceId: {TraceId}.",
                        clientIp,
                        traceId);
                }

                return;
            }

            if (IsPostTo(path, method, RegisterPath) &&
                statusCode == StatusCodes.Status201Created)
            {
                _logger.LogInformation(
                    SecurityLogEvents.RegistrationSucceeded,
                    "Security event: registration succeeded. ClientIp: {ClientIp}. TraceId: {TraceId}.",
                    clientIp,
                    traceId);

                return;
            }

            if (statusCode == StatusCodes.Status403Forbidden)
            {
                _logger.LogWarning(
                    SecurityLogEvents.AuthorizationDenied,
                    "Security event: authorization denied for {Method} {Path}. ClientIp: {ClientIp}. UserId: {UserId}. TraceId: {TraceId}.",
                    method,
                    path,
                    clientIp,
                    userId,
                    traceId);
            }
        }

        private static bool IsPostTo(
            string path,
            string method,
            string expectedPath)
        {
            return HttpMethods.IsPost(method) &&
                   string.Equals(
                       path,
                       expectedPath,
                       StringComparison.OrdinalIgnoreCase);
        }

        private static string GetClientIp(HttpContext context)
        {
            return context.Connection.RemoteIpAddress?.ToString()
                ?? "unknown";
        }

        private static string SanitizeForLog(string? value)
        {
            return (value ?? string.Empty)
                .Replace("\r", string.Empty)
                .Replace("\n", string.Empty);
        }
    }
}
