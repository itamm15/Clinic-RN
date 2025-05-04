using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class DoctorController : Controller
{
  private readonly AppDbContext _context;

  public DoctorController(AppDbContext context)
  {
    _context = context;
  }


  // routes
  [HttpGet]
  public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctors()
  {
    return await _context.Doctors.ToListAsync();
  }
}
