using CyberpunkTcgVault.Api.Controllers;
using CyberpunkTcgVault.Api.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace CyberpunkTcgVault.Api.Tests;

public class FrontendContractShapeTests
{
    [Fact]
    public void AuthUserResponse_ContainsOnlyDeliberateFrontendAccountFields()
    {
        var properties = typeof(AuthUserResponse)
            .GetProperties()
            .Select(property => property.Name)
            .OrderBy(name => name)
            .ToArray();

        Assert.Equal(
            new[]
            {
                nameof(AuthUserResponse.Email),
                nameof(AuthUserResponse.EmailConfirmed),
                nameof(AuthUserResponse.Roles),
                nameof(AuthUserResponse.TwoFactorEnabled),
                nameof(AuthUserResponse.UserId),
                nameof(AuthUserResponse.UserName)
            },
            properties);
    }

    [Fact]
    public void AuthController_ExposesExpectedMfaContinuationRoutes()
    {
        AssertPostRoute(
            nameof(AuthController.CompleteMfaLogin),
            "mfa");
        AssertPostRoute(
            nameof(AuthController.CompleteRecoveryCodeLogin),
            "mfa/recovery");
    }

    [Fact]
    public void CollectorResponses_ExposePrintingArtwork()
    {
        Assert.NotNull(typeof(OwnedCardResponse).GetProperty("ImageUrl"));
        Assert.NotNull(typeof(WishListItemResponse).GetProperty("ImageUrl"));
    }

    [Fact]
    public void MfaResetRequest_SupportsStrongSecondFactorVerification()
    {
        Assert.NotNull(typeof(ResetMfaRequest).GetProperty("CurrentPassword"));
        Assert.NotNull(typeof(ResetMfaRequest).GetProperty("AuthenticatorCode"));
        Assert.NotNull(typeof(ResetMfaRequest).GetProperty("RecoveryCode"));
    }

    private static void AssertPostRoute(
        string methodName,
        string expectedTemplate)
    {
        var method = typeof(AuthController).GetMethod(methodName);
        Assert.NotNull(method);

        var attribute = method!
            .GetCustomAttributes(typeof(HttpPostAttribute), inherit: true)
            .Cast<HttpPostAttribute>()
            .Single();

        Assert.Equal(expectedTemplate, attribute.Template);
    }
}
