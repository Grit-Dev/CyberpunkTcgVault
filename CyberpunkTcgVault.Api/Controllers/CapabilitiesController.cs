using CyberpunkTcgVault.Api.DTOs;
using CyberpunkTcgVault.Api.Options;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace CyberpunkTcgVault.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CapabilitiesController : ControllerBase
    {
        private readonly ProductCapabilitiesOptions _capabilities;

        public CapabilitiesController(
            IOptions<ProductCapabilitiesOptions> options)
        {
            _capabilities = options.Value;
        }

        [AllowAnonymous]
        [HttpGet]
        public ActionResult<ProductCapabilitiesResponse> GetCapabilities()
        {
            var response = new ProductCapabilitiesResponse
            {
                PublicRegistrationEnabled =
                    _capabilities.PublicRegistrationEnabled,

                DemoAccessEnabled =
                    _capabilities.DemoAccessEnabled
            };

            return Ok(response);
        }
    }
}