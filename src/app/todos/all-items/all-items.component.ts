import { Component, OnInit } from '@angular/core';

import {TodoItem} from '../../core/models/todo-item';
import {TodoItemsService} from '../../core/services/todo-items.service';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.scss']
})
export class AllItemsComponent implements OnInit {
  todoItems: TodoItem[];
  constructor (private todoItemService: TodoItemsService) {
  }
  ngOnInit() {
    this.todoItems = this.todoItemService.todoItems;
  }
}
