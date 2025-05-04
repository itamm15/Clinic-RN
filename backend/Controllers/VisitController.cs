using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class VisitController : Controller
{
  private readonly AppDbContext _context;

  public VisitController(AppDbContext context)
  {
    _context = context;
  }


  // routes
  [HttpGet]
  public async Task<ActionResult<IEnumerable<Visit>>> GetVisits()
  {
    return await _context.Visits.ToListAsync();
  }
}
