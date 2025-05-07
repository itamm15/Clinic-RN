using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
  private readonly AppDbContext _context;

  public PaymentController(AppDbContext context)
  {
    _context = context;
  }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Payment>>> GetPayments()
    {
      return await _context.Payments
          .Include(p => p.Patient)
          .ToListAsync();
    }
}
