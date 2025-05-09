using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ExaminationController : ControllerBase
{
  private readonly AppDbContext _context;

  public ExaminationController(AppDbContext context)
  {
    _context = context;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<MedExamination>>> GetExaminations()
  {
    return await _context.MedExaminations.Include(x => x.Doctor).ToListAsync();
  }

  [HttpPost]
  public async Task<ActionResult<bool>> AddExamination([FromBody] MedExaminationCreateDto examination)
  {
      var medExamination = new MedExamination
      {
          Name = examination.Name,
          Description = examination.Description,
          DoctorId = examination.DoctorId
      };

      _context.MedExaminations.Add(medExamination);
      await _context.SaveChangesAsync();
      return true;
  }
}

public class MedExaminationCreateDto
{
  public string Name { get; set; }
  public string Description { get; set; }
  public int DoctorId { get; set; }
}
