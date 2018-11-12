import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import {TodoItemsComponent} from './todo-items.component';

const routes: Routes = [
  {path: '', component: TodoItemsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoItemsRoutingModule { }
