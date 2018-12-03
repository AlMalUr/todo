import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mapTo } from 'rxjs/operators';

import { TodoItem } from '../models/todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsRequestsService {

  dataUrl = 'todo-items';

  constructor(private http: HttpClient) { }

  deleteTodoItemById(id: number) {
    return this.http.delete<TodoItem>(`${this.dataUrl}/${id}`).pipe(mapTo(id));
  }

  toggleTodoItemComplete(id: number, changeItem: TodoItem) {
    return this.http.put<TodoItem>(`${this.dataUrl}/${id}`, changeItem);
  }

  addTodoItem(newTodoItem: TodoItem) {
    return this.http.post<TodoItem>(this.dataUrl, newTodoItem);
  }

  fetchTodoItems() {
    return this.http.get<TodoItem[]>(this.dataUrl);
  }
}


