import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { combineLatest, map } from 'rxjs/operators';

import { TodoItem } from '../../core/models/todo-item';
import { TodoItemsService } from '../../core/services/todo-items.service';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {

  todoItems: TodoItem[];
  todoItems$: Observable<TodoItem[]>;

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
    this.todoItems$ = this.todoItemService.todoItems$;
    this.todoItems$
    .pipe(
      combineLatest(this.route.data),
      map(([todoItems, route]) => {
        if (route.completed === undefined) {
          return todoItems;
        } else {
          return todoItems.filter(item => item.complete === route.completed);
        }
      })
    )
    .subscribe(todoItems =>
      this.todoItems = todoItems
    );
  }
}
