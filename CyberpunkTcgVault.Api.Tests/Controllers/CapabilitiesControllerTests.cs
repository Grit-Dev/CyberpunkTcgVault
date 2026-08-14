using CyberpunkTcgVault.Api.Controllers;
using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Options;
using Microsoft.AspNetCore.Mvc;
using FrameworkOptions = Microsoft.Extensions.Options.Options;

namespace CyberpunkTcgVault.Api.Tests.Controllers
{
    public class CapabilitiesControllerTests
    {
        [Fact]
        public void GetCapabilities_ReturnsConfiguredCapabilities()
        {
            // Arrange
            var options = FrameworkOptions.Create(
                new ProductCapabilitiesOptions
                {
                    PublicRegistrationEnabled = true,
                    DemoAccessEnabled = true
                });

            var controller =
                new CapabilitiesController(options);

            // Act
            var result = controller.GetCapabilities();

            // Assert
            var ok = Assert.IsType<OkObjectResult>(result.Result);

            var response = Assert.IsType<ProductCapabilitiesResponse>(ok.Value);

            Assert.True(response.PublicRegistrationEnabled);

            Assert.True(response.DemoAccessEnabled);
        }
    }
}