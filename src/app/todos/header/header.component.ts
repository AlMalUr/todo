import {Component} from '@angular/core';

import {TodoItem} from '../../core/models/todo-item';
import {TodoItemsService} from '../../core/services/todo-items.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss'
  ]
})
export class HeaderComponent {
  newTodoItem: TodoItem  = new TodoItem;
  constructor(private todoItemsService: TodoItemsService) {}
  addTodoItem(newTodoItem) {
    this.todoItemsService.addTodoItem(newTodoItem);
    this.newTodoItem = new TodoItem();
  }
}
