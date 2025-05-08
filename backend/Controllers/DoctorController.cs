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

  [HttpGet("{id}")]
  public async Task<ActionResult<Doctor>> GetDoctor(int id)
  {
    return await _context.Doctors.Include(d => d.Specialization).FirstAsync(d => d.Id == id);
  }

  [HttpPut("{id}")]
  public async Task<ActionResult<bool>> UpdateDoctor(int id, [FromBody] DoctorCreateDto updatedDoctor)
  {
    var existing = await _context.Doctors.FindAsync(id);

    existing.Name = updatedDoctor.Name;
    existing.LastName = updatedDoctor.LastName;
    existing.Email = updatedDoctor.Email;
    existing.SpecializationId = updatedDoctor.SpecializationId;

    await _context.SaveChangesAsync();

    return true;
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult<bool>> DeleteDoctor(int id)
  {
      var doctor = await _context.Doctors.FindAsync(id);

      _context.Doctors.Remove(doctor);
      await _context.SaveChangesAsync();

      return true;
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
