using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
  public DbSet<Doctor> Doctors { get; set; }
  public DbSet<Patient> Patients { get; set; }
  public DbSet<Visit> Visits { get; set; }
  public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}
