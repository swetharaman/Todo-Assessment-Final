using TodoListApplication.Models;

namespace TodoListApplication.Services;

public class TodoService : ITodoService
{
    // In-memory list to store Todo items 
    private readonly List<TodoItem> _todos = new();

    // Get all Todo Items
    public IEnumerable<TodoItem> GetAll()
    {
        return _todos.OrderByDescending(t => t.CreatedAt);
    }

    // Add Todo Item
    public TodoItem Add(string title)
    {
        var newItem = new TodoItem { Title = title };
        _todos.Add(newItem);
        return newItem;
    }

    // Delete Todo Item
    public bool Delete(Guid id)
    {
        var item = _todos.FirstOrDefault(t => t.Id == id);
        if (item == null) return false;

        return _todos.Remove(item);
    }
}