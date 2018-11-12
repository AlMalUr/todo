import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent } from './todos.component';


const routes: Routes = [
  {path: '',
    component: TodosComponent,
  children: [
    {path: '', loadChildren: './all-items/all-items.module#AllItemsModule'},
    {path: 'active', loadChildren: './active-items/active-items.module#ActiveItemsModule'},
    {path: 'completed', loadChildren: './completed-items/completed-items.module#CompletedItemsModule'}
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
