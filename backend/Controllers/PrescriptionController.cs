using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class PrescriptionController : ControllerBase
{
  private readonly AppDbContext _context;

  public PrescriptionController(AppDbContext context)
  {
      _context = context;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<Prescription>>> GetPrescriptions()
  {
      return await _context.Prescriptions
          .Include(p => p.Patient)
          .Include(p => p.Doctor)
          .ToListAsync();
  }
}
