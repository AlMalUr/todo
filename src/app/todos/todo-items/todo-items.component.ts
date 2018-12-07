import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TodoItem } from '../../core/models/todo-item';
import { TodoItemsService } from '../../core/services/todo-items.service';


@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {

  todoItems$: Observable<TodoItem[]>;
  todoItemsCount$: Observable<number>;

  constructor(
    private todoItemService: TodoItemsService,
    private route: ActivatedRoute
  ) {
  }

  deleteTodoItemById(id: number): void {
    this.todoItemService.deleteTodoItemById(id);
  }

  toggleTodoItemComplete(id: number): void {
    this.todoItemService.toggleTodoItemComplete(id);
  }

  ngOnInit() {
    this.todoItemsCount$ = this.todoItemService.todoItemsCount$;
    this.todoItems$ = combineLatest(this.todoItemService.todoItems$, this.route.data)
    .pipe(
      map(([todoItems, route]) => {
        if (route.completed === undefined) {
          return todoItems;
        } else {
          return todoItems.filter(item => item.complete === route.completed);
        }
      })
    );
  }
}
