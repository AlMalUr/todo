import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { TodoItemsService } from './todo-items.service';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsResolverService implements Resolve<any> {

  constructor(
    private todoItemsService: TodoItemsService
  ) {
  }

  resolve() {
    return this.todoItemsService.fetchTodoItems();
  }
}
