public class VisitDto
{
  public int Id { get; set; }
  public DateTime VisitDate { get; set; }
  public string VisitReason { get; set; }

  public string PatientFullName { get; set; }
  public string DoctorFullName { get; set; }
  public string DoctorSpecialization { get; set; }
}
