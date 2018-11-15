import {Injectable} from '@angular/core';

import {TODO_ITEMS} from '../mock/mock-todo-items';
import {TodoItem} from '../models/todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {

  todoItems: TodoItem[] = TODO_ITEMS;

  deleteTodoItemById(id: number): TodoItem[] {
    this.todoItems = this.todoItems.filter(item => item.id !== id);
    return this.todoItems;
  }

  toggleTodoItemComplete(id: number): void {
    const i: TodoItem[] = this.todoItems;
    const index: number = this.todoItems.findIndex(item => item.id === id);
    i[index].complete = !i[index].complete;
  }

  addTodoItem(newTodoItem: TodoItem): void {
    this.todoItems.push(newTodoItem);
  }

}
