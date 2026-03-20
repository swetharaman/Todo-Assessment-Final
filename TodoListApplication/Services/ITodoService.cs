using TodoListApplication.Models;

namespace TodoListApplication.Services;

public interface ITodoService
{
    IEnumerable<TodoItem> GetAll();
    TodoItem Add(string title);
    bool Delete(Guid id);
}