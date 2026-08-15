using CyberpunkTcgVault.Api.Controllers;
using CyberpunkTcgVault.Api.Security;
using Microsoft.AspNetCore.Authorization;

namespace CyberpunkTcgVault.Api.Tests;

public class AuthorizationContractTests
{
    [Theory]
    [InlineData(typeof(OwnedCardsController), nameof(OwnedCardsController.CreateOwnedCard), AuthorizationPolicies.CollectorWrite)]
    [InlineData(typeof(OwnedCardsController), nameof(OwnedCardsController.UpdateOwnedCard), AuthorizationPolicies.CollectorWrite)]
    [InlineData(typeof(OwnedCardsController), nameof(OwnedCardsController.DeleteOwnedCard), AuthorizationPolicies.CollectorWrite)]
    [InlineData(typeof(WishListItemController), nameof(WishListItemController.CreateWishListItem), AuthorizationPolicies.CollectorWrite)]
    [InlineData(typeof(WishListItemController), nameof(WishListItemController.UpdateWishListItem), AuthorizationPolicies.CollectorWrite)]
    [InlineData(typeof(WishListItemController), nameof(WishListItemController.DeleteWishListItem), AuthorizationPolicies.CollectorWrite)]
    [InlineData(typeof(CollectionProductsController), nameof(CollectionProductsController.UpdateCollectionProduct), AuthorizationPolicies.CollectorWrite)]
    [InlineData(typeof(CollectionProductsController), nameof(CollectionProductsController.CreateCollectionProduct), AuthorizationPolicies.CollectorProductCreateDelete)]
    [InlineData(typeof(CollectionProductsController), nameof(CollectionProductsController.DeleteCollectionProduct), AuthorizationPolicies.CollectorProductCreateDelete)]
    [InlineData(typeof(CardsController), nameof(CardsController.CreateCard), AuthorizationPolicies.AdminWithMfa)]
    [InlineData(typeof(CardsController), nameof(CardsController.UpdateCard), AuthorizationPolicies.AdminWithMfa)]
    [InlineData(typeof(CardsController), nameof(CardsController.DeleteCard), AuthorizationPolicies.AdminWithMfa)]
    [InlineData(typeof(AccountController), nameof(AccountController.DeleteAccount), AuthorizationPolicies.AccountDelete)]
    public void MutatingEndpoints_UseExpectedPolicy(
        Type controllerType,
        string methodName,
        string expectedPolicy)
    {
        var method = controllerType.GetMethod(methodName);
        Assert.NotNull(method);

        var authorize = method!
            .GetCustomAttributes(typeof(AuthorizeAttribute), inherit: true)
            .Cast<AuthorizeAttribute>()
            .Single(attribute => !string.IsNullOrWhiteSpace(attribute.Policy));

        Assert.Equal(expectedPolicy, authorize.Policy);
    }

    [Fact]
    public void AccountSecurity_ExcludesDemoThroughDedicatedPolicy()
    {
        var authorize = typeof(AccountSecurityController)
            .GetCustomAttributes(typeof(AuthorizeAttribute), inherit: true)
            .Cast<AuthorizeAttribute>()
            .Single();

        Assert.Equal(AuthorizationPolicies.AccountSecurityWrite, authorize.Policy);
    }
}
