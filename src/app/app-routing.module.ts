import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoItemsResolverService } from './core/services/todo-items-resolver.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: './todos/todos.module#TodosModule'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
