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

  route: boolean | undefined;
  todoItems: TodoItem[];

  constructor (
    private todoItemService: TodoItemsService,
    private activeRoute: ActivatedRoute
  ) {
  }

  deleteTodoItemById(id: number): void {
    this.todoItems = this.todoItemService.deleteTodoItemById(id);
  }

  toggleTodoItemComplete(id: number): void {
    this.todoItemService.toggleTodoItemComplete(id);
  }

  ngOnInit() {
    this.todoItems = this.todoItemService.todoItems;
    this.route = this.activeRoute.snapshot.data.completed;
  }
}
