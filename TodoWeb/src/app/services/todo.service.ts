import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// This interface matches your C# TodoItem model
export interface TodoItem {
  id: string;
  title: string;
  isCompleted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private http = inject(HttpClient);
  
  // Change this port to match whatever port your .NET app is running on!
  private apiUrl = 'https://localhost:7173/api/todo'; 

  // This signal holds the list of todos for the whole app
  todos = signal<TodoItem[]>([]);

  // GET: Load all items from the API
  loadTodos() {
    this.http.get<TodoItem[]>(this.apiUrl).subscribe(data => {
      this.todos.set(data);
    });
  }

  // POST: Add a new item
  addTodo(title: string) {
    this.http.post<TodoItem>(this.apiUrl, JSON.stringify(title), {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (newItem) => {
        // SUCCESS: Add to the list
        this.todos.update(current => [newItem, ...current]);
      },
      error: (err) => {
        // ERROR: Show the message from C# in a popup alert
        alert(err.error); 
      }
    });
  }

  // Remove an item
  deleteTodo(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      // Update the signal list by filtering out the deleted ID
      this.todos.update(current => current.filter(t => t.id !== id));
    });
  }
}