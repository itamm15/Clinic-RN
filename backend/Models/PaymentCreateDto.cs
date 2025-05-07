public class PaymentCreateDto
{
  public int PatientId { get; set; }
  public decimal Amount { get; set; }
  public DateTime IssuedAt { get; set; }
  public string Description { get; set; }
}
