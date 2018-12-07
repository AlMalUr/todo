import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { map, take } from 'rxjs/operators';

import { FetchTodoItemsFailed, FetchTodoItemsSuccess } from '../../ngxs/todo-items/todo-items.actions';

import { TodoItemsService } from './todo-items.service';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsResolverService implements Resolve<any> {

  constructor(
    private todoItemsService: TodoItemsService,
    private router: Router,
    private actions$: Actions
  ) {
  }

  resolve() {
    this.todoItemsService.fetchTodoItems();
    return this.actions$
    .pipe(
      ofActionDispatched(FetchTodoItemsSuccess, FetchTodoItemsFailed),
      map(action => {
          if (action instanceof FetchTodoItemsFailed) {
            this.router.navigate(['home']);
            return FetchTodoItemsFailed;
          } else {
            return FetchTodoItemsSuccess;
          }
        }
      ),
      take(1)
    );
  }
}

