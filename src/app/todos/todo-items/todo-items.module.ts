import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoItemsRoutingModule } from './todo-items-routing.module';
import { TodoItemsComponent } from './todo-items.component';

@NgModule({
  imports: [
    CommonModule,
    TodoItemsRoutingModule
  ],
  declarations: [TodoItemsComponent]
})
export class TodoItemsModule { }
