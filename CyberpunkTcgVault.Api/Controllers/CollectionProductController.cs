using CyberpunkTcgVault.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace CyberpunkTcgVault.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CollectionProductController : ControllerBase
    {

        //PMG TODO: TBC
        [HttpGet]
        public async Task<ActionResult<CollectionProduct>> GetCollectionProduct()
        {
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CollectionProduct>> GetCollectionProductById(int id)
        {
            return Ok();
        }
    }
}
