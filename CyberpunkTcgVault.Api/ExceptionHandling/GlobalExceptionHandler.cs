using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace CyberpunkTcgVault.Api.ExceptionHandling
{
    public class GlobalExceptionHandler : IExceptionHandler
    {
        private readonly ILogger<GlobalExceptionHandler> _logger;
        private readonly IProblemDetailsService _problemDetailsService;

        public GlobalExceptionHandler(
            ILogger<GlobalExceptionHandler> logger,
            IProblemDetailsService problemDetailsService)
        {
            _logger = logger;
            _problemDetailsService = problemDetailsService;
        }

        private static string SanitizeForLog(string? value)
        {
            return (value ?? string.Empty)
                .Replace("\r", string.Empty)
                .Replace("\n", string.Empty);
        }

        public async ValueTask<bool> TryHandleAsync(
            HttpContext httpContext,
            Exception exception,
            CancellationToken cancellationToken)
        {
            // Request-derived values are sanitized before logging so a caller
            // cannot inject line breaks and forge misleading log entries.
            var method = SanitizeForLog(httpContext.Request.Method);
            var path = SanitizeForLog(
                httpContext.Request.Path.ToString());
            var traceId = SanitizeForLog(
                httpContext.TraceIdentifier);

            _logger.LogError(
                exception,
                "Unhandled exception while processing {Method} {Path}. TraceId: {TraceId}",
                method,
                path,
                traceId);

            httpContext.Response.StatusCode =
                StatusCodes.Status500InternalServerError;

            var problemDetails = new ProblemDetails
            {
                Status = StatusCodes.Status500InternalServerError,
                Title = "An unexpected server error occurred."
            };

            var written = await _problemDetailsService.TryWriteAsync(
                new ProblemDetailsContext
                {
                    HttpContext = httpContext,
                    ProblemDetails = problemDetails
                });

            if (!written)
            {
                await httpContext.Response.WriteAsJsonAsync(
                    problemDetails,
                    cancellationToken);
            }

            return true;
        }
    }
}
