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
  public async Task<ActionResult<IEnumerable<VisitDto>>> GetVisits()
  {
    return await _context.Visits.Select(v => new VisitDto
    {
      Id = v.Id,
      VisitDate = v.VisitDate,
      VisitReason = v.VisitReason,
      PatientFullName = v.Patient.FirstName + " " + v.Patient.LastName,
      DoctorFullName = v.Doctor.Name + " " + v.Doctor.LastName,
      DoctorSpecialization = v.Doctor.Specialization.Name
    })
    .ToListAsync();
  }
}
