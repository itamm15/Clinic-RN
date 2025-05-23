using System.ComponentModel.DataAnnotations;

public class Doctor
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Imię jest wymagane")]
    [StringLength(50, ErrorMessage = "Imię nie może być dłuższe niż 50 znaków")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Nazwisko jest wymagane")]
    [StringLength(50, ErrorMessage = "Nazwisko nie może być dłuższe niż 50 znaków")]
    public string LastName { get; set; }

    [Required]
    public int SpecializationId { get; set; }
    public Specialization Specialization { get; set; }

    [Required(ErrorMessage = "Email jest wymagany")]
    [EmailAddress(ErrorMessage = "Niepoprawny format adresu e-mail")]
    [StringLength(100)]
    public string Email { get; set; }

    [Required(ErrorMessage = "Data urodzenia jest wymagana")]
    [DataType(DataType.Date)]
    public DateTime DateOfBirth { get; set; }
}
