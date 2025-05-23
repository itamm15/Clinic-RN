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

  [HttpPut("{id}")]
  public async Task<ActionResult<bool>> UpdatePrescription(int id, [FromBody] PrescriptionCreateDto updated)
  {
    var existing = await _context.Prescriptions.FindAsync(id);
    if (existing == null) return NotFound();

    existing.Description = updated.Description;
    existing.IssuedAt = updated.IssuedAt;
    existing.PatientId = updated.PatientId;
    existing.DoctorId = updated.DoctorId;

    await _context.SaveChangesAsync();
    return true;
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Prescription>> GetPrescription(int id)
  {
    var prescription = await _context.Prescriptions
        .Include(p => p.Patient)
        .Include(p => p.Doctor)
        .FirstOrDefaultAsync(p => p.Id == id);

    return prescription;
  }
  [HttpDelete("{id}")]
  public async Task<IActionResult> DeletePrescription(int id)
  {
      var prescription = await _context.Prescriptions.FindAsync(id);

      _context.Prescriptions.Remove(prescription);
      await _context.SaveChangesAsync();

      return NoContent();
  }
}
