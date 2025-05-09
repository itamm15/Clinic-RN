using System.ComponentModel.DataAnnotations;

public class MedExamination
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Name { get; set; }

    [StringLength(500)]
    public string Description { get; set; }

    [Required]
    public int DoctorId { get; set; }
    public Doctor Doctor { get; set; }
}
