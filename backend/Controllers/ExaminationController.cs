using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ExaminationController : ControllerBase
{
  private readonly AppDbContext _context;

  public ExaminationController(AppDbContext context)
  {
    _context = context;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<MedExamination>>> GetExaminations()
  {
    return await _context.MedExaminations.ToListAsync();
  }
}
