import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';


import {TodoItem} from '../../core/models/todo-item';
import {TodoItemsService} from '../../core/services/todo-items.service';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {
  route: string;
  todoItems: TodoItem[];
  constructor (private todoItemService: TodoItemsService, private activeRoute: ActivatedRoute) {
  }
  deleteTodoItemById(id) {
    this.todoItemService.deleteTodoItemById(id);
  }
  toggleTodoItemComplete(id) {
    this.todoItemService.toggleTodoItemComplete(id);
  }
  ngOnInit() {
    this.todoItems = this.todoItemService.todoItems;
    this.route = this.activeRoute.snapshot.data.title;
  }
}
