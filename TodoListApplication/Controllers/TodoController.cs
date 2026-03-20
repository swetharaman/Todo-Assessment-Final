using Microsoft.AspNetCore.Mvc;
using TodoListApplication.Models;
using TodoListApplication.Services;

namespace TodoListApplication.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private readonly ITodoService _todoService;

    // The service is injected here via the Constructor
    public TodoController(ITodoService todoService)
    {
        _todoService = todoService;
    }

    // Get all Todo items for listing
    [HttpGet]
    public ActionResult<IEnumerable<TodoItem>> GetAll()
    {
        return Ok(_todoService.GetAll());
    }

    // Create new Todo Action
    [HttpPost]
    public ActionResult<TodoItem> Create([FromBody] string title)
    {
        if (string.IsNullOrWhiteSpace(title))
            return BadRequest("Todo Item cannot be empty");

        var newItem = _todoService.Add(title);
        return CreatedAtAction(nameof(GetAll), new { id = newItem.Id }, newItem);
    }

    // Delete Todo Action
    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        var deleted = _todoService.Delete(id);
        if (!deleted) return NotFound();

        return NoContent();
    }
}