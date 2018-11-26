import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoItemsResolverService } from '../../core/services/todo-items-resolver.service';

import { TodoItemsComponent } from './todo-items.component';

const routes: Routes = [
  {
    path: '',
    component: TodoItemsComponent,
    resolve: {item: TodoItemsResolverService}
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoItemsRoutingModule {
}
