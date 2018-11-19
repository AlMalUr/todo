import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {TODO_ITEMS} from '../mock/mock-todo-items';
import {TodoItem} from '../models/todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {

  todoItems: TodoItem[] = TODO_ITEMS;

  constructor(
    private http: HttpClient
  ) {
  }

  deleteTodoItemById(id: number): void {
    this.todoItems = this.todoItems.filter(item => item.id !== id);
  }

  toggleTodoItemComplete(id: number): void {
    this.todoItems = this.todoItems.map(item => {
        if (item.id === id) {
          return Object.assign( {}, item, { complete: !item.complete});
        }
        return item;
    });
    // console.log(TODO_ITEMS);
    // console.log(this.todoItems);

  }

  addTodoItem(newTodoItem: TodoItem): void {
    this.todoItems = [...this.todoItems, newTodoItem];
  }

}

