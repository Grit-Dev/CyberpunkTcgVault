using CyberpunkTcgVault.Api.Data;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace CyberpunkTcgVault.Api.HealthChecks
{
    /// <summary>
    /// Readiness check used to confirm that the API can reach its database.
    /// No connection details or exception messages are returned to clients.
    /// </summary>
    public sealed class DatabaseHealthCheck : IHealthCheck
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly ILogger<DatabaseHealthCheck> _logger;

        public DatabaseHealthCheck(
            IServiceScopeFactory scopeFactory,
            ILogger<DatabaseHealthCheck> logger)
        {
            _scopeFactory = scopeFactory;
            _logger = logger;
        }

        public async Task<HealthCheckResult> CheckHealthAsync(
            HealthCheckContext context,
            CancellationToken cancellationToken = default)
        {
            try
            {
                using var scope = _scopeFactory.CreateScope();

                var dbContext = scope.ServiceProvider
                    .GetRequiredService<AppDbContext>();

                var canConnect = await dbContext.Database
                    .CanConnectAsync(cancellationToken);

                return canConnect
                    ? HealthCheckResult.Healthy()
                    : HealthCheckResult.Unhealthy();
            }
            catch (Exception exception)
            {
                // Full technical details stay in server-side logs only.
                _logger.LogError(
                    exception,
                    "Database readiness health check failed.");

                return HealthCheckResult.Unhealthy();
            }
        }
    }
}
