using CyberpunkTcgVault.Api.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace CyberpunkTcgVault.Api.Tests;

public class AuthorizationPolicyTests
{
    private readonly AuthorizationOptions _options = CreateOptions();

    [Fact]
    public void CollectorWrite_AllowsUserDemoAndAdmin()
    {
        var roles = GetAllowedRoles(AuthorizationPolicies.CollectorWrite);

        Assert.Equal(
            new[] { AppRoles.Admin, AppRoles.Demo, AppRoles.User },
            roles.OrderBy(role => role).ToArray());
    }

    [Fact]
    public void CollectorProductCreateDelete_ExcludesDemo()
    {
        var roles = GetAllowedRoles(
            AuthorizationPolicies.CollectorProductCreateDelete);

        Assert.Contains(AppRoles.User, roles);
        Assert.Contains(AppRoles.Admin, roles);
        Assert.DoesNotContain(AppRoles.Demo, roles);
    }

    [Fact]
    public void AccountSecurityWrite_ExcludesDemo()
    {
        var roles = GetAllowedRoles(
            AuthorizationPolicies.AccountSecurityWrite);

        Assert.Contains(AppRoles.User, roles);
        Assert.Contains(AppRoles.Admin, roles);
        Assert.DoesNotContain(AppRoles.Demo, roles);
    }


    [Fact]
    public void AccountDelete_AllowsOnlyNormalUser()
    {
        var roles = GetAllowedRoles(AuthorizationPolicies.AccountDelete);

        Assert.Equal(new[] { AppRoles.User }, roles.ToArray());
    }

    [Fact]
    public void AdminWithMfa_RequiresAdminRoleAndMfaClaim()
    {
        var policy = _options.GetPolicy(AuthorizationPolicies.AdminWithMfa);
        Assert.NotNull(policy);

        var roles = policy!.Requirements
            .OfType<RolesAuthorizationRequirement>()
            .Single()
            .AllowedRoles;

        Assert.Equal(new[] { AppRoles.Admin }, roles.ToArray());

        var mfaRequirement = policy.Requirements
            .OfType<ClaimsAuthorizationRequirement>()
            .Single(requirement => requirement.ClaimType == "amr");

        Assert.Contains("mfa", mfaRequirement.AllowedValues!);
    }

    private IReadOnlyCollection<string> GetAllowedRoles(string policyName)
    {
        var policy = _options.GetPolicy(policyName);
        Assert.NotNull(policy);

        return policy!.Requirements
            .OfType<RolesAuthorizationRequirement>()
            .Single()
            .AllowedRoles
            .ToArray();
    }

    private static AuthorizationOptions CreateOptions()
    {
        var options = new AuthorizationOptions();
        AuthorizationConfiguration.Configure(options);
        return options;
    }
}
