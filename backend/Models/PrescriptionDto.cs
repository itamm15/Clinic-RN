public class PrescriptionCreateDto
{
    public DateTime IssuedAt { get; set; }
    public string Description { get; set; }
    public int PatientId { get; set; }
    public int DoctorId { get; set; }
}
