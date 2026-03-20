import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from './services/todo.service'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  todoService = inject(TodoService);
  newTodoTitle = ''; // Changed from signal to standard string for easier ngModel binding

  ngOnInit() {
    this.todoService.loadTodos();
  }

  addTodo() {    
      this.todoService.addTodo(this.newTodoTitle);
      this.newTodoTitle = ''; 
  }
}