using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
  public DbSet<Doctor> Doctors { get; set; }
  public DbSet<Patient> Patients { get; set; }
  public DbSet<Visit> Visits { get; set; }
  public DbSet<Specialization> Specializations { get; set; }
  public DbSet<Prescription> Prescriptions { get; set; }
  public DbSet<Payment> Payments { get; set; }
  public DbSet<Document> Documents { get; set; }
  public DbSet<MedExamination> MedExaminations { get; set; }
  public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}
