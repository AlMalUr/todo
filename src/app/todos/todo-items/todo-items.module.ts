import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared/shared.module';

import {FilterTodoItemsPipe} from './filter-todo-items.pipe';
import {TodoItemsRoutingModule} from './todo-items-routing.module';
import {TodoItemsComponent} from './todo-items.component';

@NgModule({
  imports: [
    CommonModule,
    TodoItemsRoutingModule,
    SharedModule
  ],
  declarations: [TodoItemsComponent, FilterTodoItemsPipe]
})
export class TodoItemsModule { }
