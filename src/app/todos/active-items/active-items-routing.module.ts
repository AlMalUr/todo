import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ActiveItemsComponent} from './active-items.component';

const routes: Routes = [
  {path: '', component: ActiveItemsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActiveItemsRoutingModule { }
