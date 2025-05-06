using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class PatientController : Controller
{
  private readonly AppDbContext _context;

  public PatientController(AppDbContext context)
  {
    _context = context;
  }


  // routes
  [HttpGet]
  public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
  {
    return await _context.Patients.ToListAsync();
  }

  [HttpPost]
  public async Task<ActionResult<bool>> AddPatient([FromBody] Patient patient)
  {
    _context.Patients.Add(patient);
    await _context.SaveChangesAsync();

    return true;
  }
}
