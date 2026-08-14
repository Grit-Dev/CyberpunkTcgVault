using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace CyberpunkTcgVault.Api.HealthChecks
{
    public static class HealthCheckResponseWriter
    {
        public static Task WriteAsync(
            HttpContext context,
            HealthReport report)
        {
            // Deliberately expose only the overall state. Do not leak
            // database names, connection details, exception messages or
            // individual dependency internals through a public health route.
            return context.Response.WriteAsJsonAsync(
                new
                {
                    status = report.Status.ToString()
                });
        }
    }
}
