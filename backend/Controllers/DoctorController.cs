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
    return await _context.Doctors.Include(d => d.Specialization).ToListAsync();
  }

  [HttpPost]
  public async Task<ActionResult<bool>> AddDoctor([FromBody] DoctorCreateDto dto)
  {
    // TODO: add validation
    var doctor = new Doctor
    {
      Name = dto.Name,
      LastName = dto.LastName,
      Email = dto.Email,
      DateOfBirth = dto.DateOfBirth,
      SpecializationId = dto.SpecializationId
    };

    _context.Doctors.Add(doctor);
    await _context.SaveChangesAsync();

    return true;
  }
}
