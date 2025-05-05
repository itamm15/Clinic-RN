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

  [HttpGet("weekly-summary")]
  public async Task<ActionResult<IEnumerable<VisitSummaryDto>>> GetWeeklySummary()
  {
    // period
    var today = DateTime.Today;
    var startOfWeek = DateTime.SpecifyKind(
        today.AddDays(-(int)today.DayOfWeek + (int)DayOfWeek.Monday),
        DateTimeKind.Utc
    );
    var endOfWeek = DateTime.SpecifyKind(startOfWeek.AddDays(6), DateTimeKind.Utc);

    // vistis
    var visits = await _context.Visits.Where(v => v.VisitDate >= startOfWeek && v.VisitDate <= endOfWeek).ToListAsync();

    return Enumerable.Range(0, 7).Select(index =>
    {
      var date = startOfWeek.AddDays(index);
      var count = visits.Count(v => v.VisitDate.Date == date.Date);

      return new VisitSummaryDto
      {
        VisitDate = date.ToString("yyyy-MM-dd"),
        VisitCount = count,
        Day = GetDayName(date.DayOfWeek)
      };
    }).ToList();
  }

  // HELPERS

  private string GetDayName(DayOfWeek dayOfWeek)
  {
    return dayOfWeek switch
    {
      DayOfWeek.Monday => "Poniedziałek",
      DayOfWeek.Tuesday => "Wtorek",
      DayOfWeek.Wednesday => "Środa",
      DayOfWeek.Thursday => "Czwartek",
      DayOfWeek.Friday => "Piątek",
      DayOfWeek.Saturday => "Sobota",
      DayOfWeek.Sunday => "Niedziela",
    };
  }
}

public class VisitSummaryDto {
    public string VisitDate { get; set; }
    public string Day { get; set; }
    public int VisitCount { get; set; }
}
