using CyberpunkTcgVault.Api.Models;
using CyberpunkTcgVault.Api.Options;
using CyberpunkTcgVault.Api.Security;
using Microsoft.AspNetCore.Identity;

namespace CyberpunkTcgVault.Api.Data
{
    public static class IdentitySeeder
    {
        public static async Task SeedRolesAsync(
            RoleManager<IdentityRole<Guid>> roleManager)
        {
            var roles = new[]
            {
                AppRoles.User,
                AppRoles.Demo,
                AppRoles.Admin
            };

            foreach (var roleName in roles)
            {
                if (await roleManager.RoleExistsAsync(roleName))
                {
                    continue;
                }

                var result = await roleManager.CreateAsync(
                    new IdentityRole<Guid>
                    {
                        Name = roleName
                    });

                if (!result.Succeeded)
                {
                    throw new InvalidOperationException(
                        $"Unable to create Identity role '{roleName}'.");
                }
            }
        }

        public static async Task<AppUser?> SeedDemoUserAsync(
            UserManager<AppUser> userManager,
            ProductCapabilitiesOptions capabilities,
            DemoUserOptions demoUserOptions)
        {
            if (!capabilities.DemoAccessEnabled)
            {
                return null;
            }

            var email = demoUserOptions.Email.Trim();
            var userName = demoUserOptions.UserName.Trim();

            if (string.IsNullOrWhiteSpace(email) ||
                string.IsNullOrWhiteSpace(userName))
            {
                throw new InvalidOperationException(
                    "Demo user configuration requires an email and username when demo access is enabled.");
            }

            var demoUser = await userManager.FindByEmailAsync(email);

            if (demoUser is null)
            {
                demoUser = new AppUser
                {
                    UserName = userName,
                    Email = email,
                    EmailConfirmed = true
                };

                // The shared Demo account intentionally has no password.
                // Browser access is only granted through POST /api/Auth/demo
                // while DemoAccessEnabled is true.
                var createResult = await userManager.CreateAsync(demoUser);

                if (!createResult.Succeeded)
                {
                    throw new InvalidOperationException(
                        "Unable to create the configured Demo user.");
                }
            }

            if (!await userManager.IsInRoleAsync(demoUser, AppRoles.Demo))
            {
                var roleResult = await userManager.AddToRoleAsync(
                    demoUser,
                    AppRoles.Demo);

                if (!roleResult.Succeeded)
                {
                    throw new InvalidOperationException(
                        "Unable to assign the Demo role to the configured Demo user.");
                }
            }

            // Demo may edit only its own collector records. It must never
            // inherit the User/Admin roles through a manual configuration
            // mistake because Admin controls the shared catalogue.
            foreach (var prohibitedRole in new[] { AppRoles.User, AppRoles.Admin })
            {
                if (!await userManager.IsInRoleAsync(demoUser, prohibitedRole))
                {
                    continue;
                }

                var removeResult = await userManager.RemoveFromRoleAsync(
                    demoUser,
                    prohibitedRole);

                if (!removeResult.Succeeded)
                {
                    throw new InvalidOperationException(
                        $"Unable to remove prohibited role '{prohibitedRole}' from the Demo user.");
                }
            }

            return demoUser;
        }
    }
}
