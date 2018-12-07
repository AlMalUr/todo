import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { MAT_CHECKBOX_CLICK_ACTION, MatButtonModule, MatCheckboxModule } from '@angular/material';

import {SharedModule} from '../../shared/shared.module';

import {TodoItemsRoutingModule} from './todo-items-routing.module';
import {TodoItemsComponent} from './todo-items.component';

@NgModule({
  imports: [
    CommonModule,
    TodoItemsRoutingModule,
    SharedModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  declarations: [TodoItemsComponent],
  providers: [
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop'}
  ]
})
export class TodoItemsModule { }
