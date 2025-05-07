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

  [HttpPost]
  public async Task<ActionResult<bool>> AddPayment([FromBody] PaymentCreateDto dto)
  {

    var payment = new Payment
    {
      PaymentDate = dto.PaymentDate,
      Amount = dto.Amount,
      PatientId = dto.PatientId,
      Description = dto.Description
    };

    _context.Payments.Add(payment);
    await _context.SaveChangesAsync();

    return true;
  }
}
