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

  [HttpGet("{id}")]
  public async Task<ActionResult<VisitDto>> GetVisitById(int id)
  {
    return await _context.Visits
        .Where(v => v.Id == id)
        .Include(v => v.Doctor)
        .ThenInclude(d => d.Specialization)
        .Include(v => v.Patient)
        .Select(v => new VisitDto
        {
          Id = v.Id,
          VisitDate = v.VisitDate,
          VisitReason = v.VisitReason,
          PatientFullName = v.Patient.FirstName + " " + v.Patient.LastName,
          DoctorFullName = v.Doctor.Name + " " + v.Doctor.LastName,
          DoctorSpecialization = v.Doctor.Specialization.Name
        })
        .FirstAsync();
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

  [HttpGet("daily-summary")]
  public async Task<ActionResult<IEnumerable<VisitDto>>> GetDailySummary([FromQuery] string date)
  {
    var requestedDate = DateTime.SpecifyKind(DateTime.Parse(date), DateTimeKind.Utc);
    var nextDay = requestedDate.AddDays(1);

    var res = await _context.Visits.
                Where(v => v.VisitDate >= requestedDate && v.VisitDate < nextDay)
                .Include(v => v.Doctor)
                .Include(v => v.Patient)
                .Select(v => new VisitDto
                {
                  Id = v.Id,
                  VisitDate = v.VisitDate,
                  VisitReason = v.VisitReason,
                  PatientFullName = v.Patient.FirstName + " " + v.Patient.LastName,
                  DoctorFullName = v.Doctor.Name + " " + v.Doctor.LastName,
                  DoctorSpecialization = v.Doctor.Specialization.Name
                })
                .ToListAsync();

    Console.WriteLine(res);

    return res;
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult<bool>> DeleteVisit(int id)
  {
    var visit = await _context.Visits.FindAsync(id);
    if (visit == null) return true;

    _context.Visits.Remove(visit);
    await _context.SaveChangesAsync();

    return true;
  }

  [HttpPost]
  public async Task<ActionResult<bool>> AddVisit([FromBody] VisitCreateDto dto)
  {
    // TODO: add validation
    var visit = new Visit
    {
      VisitDate = dto.VisitDate,
      VisitReason = dto.VisitReason,
      PatientId = dto.PatientId,
      DoctorId = dto.DoctorId
    };

    _context.Visits.Add(visit);
    await _context.SaveChangesAsync();

    return true;
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateVisit(int id, [FromBody] VisitCreateDto updatedVisit)
  {
      var visit = await _context.Visits.FindAsync(id);

      visit.VisitDate = updatedVisit.VisitDate;
      visit.VisitReason = updatedVisit.VisitReason;
      visit.PatientId = updatedVisit.PatientId;
      visit.DoctorId = updatedVisit.DoctorId;

      await _context.SaveChangesAsync();
      return NoContent();
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
