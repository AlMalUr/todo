import { Component, OnInit } from '@angular/core';

import {TodoItem} from '../../core/models/todo-item';
import {TodoItemsService} from '../../core/services/todo-items.service';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {
  todoItems: TodoItem[];
  constructor (private todoItemService: TodoItemsService) {
  }
  ngOnInit() {
    this.todoItems = this.todoItemService.todoItems;
  }
}
