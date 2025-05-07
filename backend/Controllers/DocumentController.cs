using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class DocumentController : ControllerBase
{
  private readonly AppDbContext _context;

  public DocumentController(AppDbContext context)
  {
    _context = context;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<Document>>> GetDocuments()
  {
    return await _context.Documents.ToListAsync();
  }

  [HttpPost]
  public async Task<ActionResult<bool>> AddDocument([FromBody] DocumentCreateDto document)
  {

    var newDocument = new Document
    {
      Title = document.Title,
      Description = document.Description,
      CreatedAt = DateTime.UtcNow
    };

      _context.Documents.Add(newDocument);
      await _context.SaveChangesAsync();

      return true;
  }
}
