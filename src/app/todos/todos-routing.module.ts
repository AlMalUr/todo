import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodosComponent } from './todos.component';


const routes: Routes = [
  {path: '',
    component: TodosComponent,
    children: [
      {
        path: '',
        loadChildren: './todo-items/todo-items.module#TodoItemsModule'
      },
      {
        path: 'active',
        loadChildren: './todo-items/todo-items.module#TodoItemsModule',
        data: {title: 'active'}
      },
      {
        path: 'completed',
        loadChildren: './todo-items/todo-items.module#TodoItemsModule',
        data: { title: 'complete' }
      }
    ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
