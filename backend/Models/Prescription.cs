using System;
using System.ComponentModel.DataAnnotations;

public class Prescription
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Data wystawienia jest wymagana")]
    public DateTime IssuedAt { get; set; }

    [Required(ErrorMessage = "Opis jest wymagany")]
    [StringLength(500, ErrorMessage = "Opis nie może przekraczać 500 znaków")]
    public string Description { get; set; }

    [Required(ErrorMessage = "Pacjent jest wymagany")]
    public int PatientId { get; set; }
    public Patient Patient { get; set; }

    [Required(ErrorMessage = "Lekarz jest wymagany")]
    public int DoctorId { get; set; }
    public Doctor Doctor { get; set; }
}
