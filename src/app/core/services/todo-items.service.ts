import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';


import {
  AddTodoItem,
  DeleteTodoItem,
  FetchTodoItems,
  ToggleTodoItemComplete
} from '../../ngxs/todo-items/todo-items.actions';
import { TodoItemsState } from '../../ngxs/todo-items/todo-items.state';
import { TodoItem } from '../models/todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {

  @Select(TodoItemsState.getTodoItems) todoItems$: Observable<TodoItem[]>;
  @Select(TodoItemsState.getTodoItemsCount) todoItemsCount$: Observable<number>;

  constructor(
    private store: Store
  ) {
  }

  deleteTodoItemById(id: number) {
    this.store.dispatch(new DeleteTodoItem(id));
  }

  toggleTodoItemComplete(id: number) {
    this.store.dispatch(new ToggleTodoItemComplete(id));
  }

  addTodoItem(newTodoItem: TodoItem) {
    this.store.dispatch(new AddTodoItem(newTodoItem));
  }

  fetchTodoItems() {
    this.store.dispatch(new FetchTodoItems());
  }
}






