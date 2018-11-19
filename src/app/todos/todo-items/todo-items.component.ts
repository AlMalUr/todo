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

  completed: boolean | undefined;

  get todoItems (): TodoItem[] {
    return this.todoItemService.todoItems;
  }

  constructor (
    private todoItemService: TodoItemsService,
    private activeRoute: ActivatedRoute
  ) {
  }

  deleteTodoItemById(id: number): void {
    this.todoItemService.deleteTodoItemById(id);
  }

  toggleTodoItemComplete(id: number): void {
    this.todoItemService.toggleTodoItemComplete(id);
  }

  ngOnInit() {
    this.completed = this.activeRoute.snapshot.data.completed;
  }
}
