using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class SpecializationController : Controller
{
    private readonly AppDbContext _context;

    public SpecializationController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Specialization>>> GetSpecializations()
    {
        return await _context.Specializations.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<bool>> AddSpecialization([FromBody] Specialization specialization)
    {
        _context.Specializations.Add(specialization);
        await _context.SaveChangesAsync();

        return true;
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> DeleteSpecialization(int id)
    {
        var specialization = await _context.Specializations.FindAsync(id);
        if (specialization == null) return true;

        _context.Specializations.Remove(specialization);
        await _context.SaveChangesAsync();
        return true;
    }
}
