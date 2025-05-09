using System.ComponentModel.DataAnnotations;

public class Examination
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Name { get; set; }

    [Required]
    [StringLength(100)]
    public string PerformedBy { get; set; }

    [StringLength(500)]
    public string Description { get; set; }
}
