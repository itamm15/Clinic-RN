using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ClinicController : ControllerBase
  {
    [HttpGet("home")]
    public IActionResult helloPage()
    {
      return Ok("hello from clinic");
    }
  }
}
