import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {TodoItem} from '../../core/models/todo-item';
import {TodoItemsService} from '../../core/services/todo-items.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  todoItems$: Observable<TodoItem[]>;
  count: number;

  constructor(
    private todoItemService: TodoItemsService
  ) {
  }

  ngOnInit() {
    this.todoItems$ = this.todoItemService.todoItems$;

    this.todoItems$
    .subscribe(todoItems => {
      this.count = todoItems.length;
    });
  }
}
