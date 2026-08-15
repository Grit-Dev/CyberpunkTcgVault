using Microsoft.AspNetCore.Authorization;

namespace CyberpunkTcgVault.Api.Security
{
    public static class AuthorizationConfiguration
    {
        public static void Configure(AuthorizationOptions options)
        {
            // Ownership is still enforced in service queries. These policies
            // decide which account types may attempt each operation.
            options.AddPolicy(
                AuthorizationPolicies.CollectorWrite,
                policy => policy.RequireRole(
                    AppRoles.User,
                    AppRoles.Demo,
                    AppRoles.Admin));

            options.AddPolicy(
                AuthorizationPolicies.CollectorProductCreateDelete,
                policy => policy.RequireRole(
                    AppRoles.User,
                    AppRoles.Admin));

            options.AddPolicy(
                AuthorizationPolicies.AccountSecurityWrite,
                policy => policy.RequireRole(
                    AppRoles.User,
                    AppRoles.Admin));

            // Shared Demo and privileged Admin identities cannot be removed
            // through the collector self-service account flow.
            options.AddPolicy(
                AuthorizationPolicies.AccountDelete,
                policy => policy.RequireRole(AppRoles.User));

            // Identity issues amr=mfa after successful two-factor sign-in.
            // Admin role membership alone is not sufficient for privileged
            // shared-catalogue mutation.
            options.AddPolicy(
                AuthorizationPolicies.AdminWithMfa,
                policy =>
                {
                    policy.RequireRole(AppRoles.Admin);
                    policy.RequireClaim("amr", "mfa");
                });
        }
    }
}
