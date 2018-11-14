import {Injectable} from '@angular/core';

import {TODO_ITEMS} from '../mock/mock-todo-items';
import {TodoItem} from '../models/todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {
  todoItems: TodoItem[] = TODO_ITEMS;
  deleteTodoItemById(id) {
    TODO_ITEMS.splice(TODO_ITEMS.findIndex(item => item.id === id), 1);
  }
  toggleTodoItemComplete(id) {
    TODO_ITEMS[TODO_ITEMS.findIndex(item => item.id === id)].complete = !TODO_ITEMS[TODO_ITEMS.findIndex(item => item.id === id)].complete;
  }
  addTodoItem(newTodoItem) {
    TODO_ITEMS.push(newTodoItem);
  }
}
