import {Injectable} from '@angular/core';

import {TODO_ITEMS} from '../mock/mock-todo-items';
import {TodoItem} from '../models/todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {
  todoItems: TodoItem[] = TODO_ITEMS;
}
