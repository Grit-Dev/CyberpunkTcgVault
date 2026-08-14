using CyberpunkTcgVault.Api.Security;
using Microsoft.AspNetCore.Identity;

namespace CyberpunkTcgVault.Api.Data
{
    public class IdentitySeeder
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
                var roleExists =
                    await roleManager.RoleExistsAsync(roleName);

                if (roleExists)
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
    }
}
