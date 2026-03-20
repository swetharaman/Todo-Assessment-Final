import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service'; 
import { provideHttpClient } from '@angular/common/http'; 
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TodoService', () => { 
  let service: TodoService;     

  beforeEach(() => {
    TestBed.configureTestingModule({
      // provide the HttpClient here
      providers: [provideHttpClient(), provideHttpClientTesting()] 
    });
    service = TestBed.inject(TodoService); // Updated injection
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});