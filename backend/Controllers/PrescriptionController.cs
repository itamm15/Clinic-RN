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

  [HttpPost]
  public async Task<ActionResult<bool>> AddPrescription([FromBody] PrescriptionCreateDto dto)
  {
      var prescription = new Prescription
      {
          IssuedAt = dto.IssuedAt,
          Description = dto.Description,
          PatientId = dto.PatientId,
          DoctorId = dto.DoctorId
      };

      _context.Prescriptions.Add(prescription);
      await _context.SaveChangesAsync();
      return true;
  }
}
