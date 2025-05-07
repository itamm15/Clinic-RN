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

  [HttpGet("{id}")]
  public async Task<ActionResult<Payment>> GetPayment(int id)
  {
    return await _context.Payments
        .Include(p => p.Patient)
        .FirstAsync(p => p.Id == id);
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

  [HttpPut("{id}")]
  public async Task<ActionResult<bool>> UpdatePayment(int id, [FromBody] PaymentCreateDto updated)
  {
    var existing = await _context.Payments.FindAsync(id);

    existing.PaymentDate = updated.PaymentDate;
    existing.Amount = updated.Amount;
    existing.PatientId = updated.PatientId;
    existing.Description = updated.Description;

    await _context.SaveChangesAsync();
    return true;
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult<bool>> DeletePayment(int id)
  {
    var payment = await _context.Payments.FindAsync(id);

    _context.Payments.Remove(payment);
    await _context.SaveChangesAsync();

    return true;
  }
}
