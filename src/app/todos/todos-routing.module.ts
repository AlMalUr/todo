import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TodosComponent} from './todos.component';
import { TodoItemsResolverService } from '../core/services/todo-items-resolver.service';


const routes: Routes = [
  {path: '',
    component: TodosComponent,
    resolve: { item: TodoItemsResolverService },
    children: [
      {
        path: '',
        loadChildren: './todo-items/todo-items.module#TodoItemsModule'
      },
      {
        path: 'active',
        loadChildren: './todo-items/todo-items.module#TodoItemsModule',
        data: {completed: false}
      },
      {
        path: 'completed',
        loadChildren: './todo-items/todo-items.module#TodoItemsModule',
        data: {completed: true}
      }
    ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
