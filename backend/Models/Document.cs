using System;
using System.ComponentModel.DataAnnotations;

public class Document
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Title { get; set; }

    [StringLength(250)]
    public string Description { get; set; }

    [Required]
    public DateTime CreatedAt { get; set; }
}
