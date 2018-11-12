import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CompletedItemsComponent} from './completed-items.component';

const routes: Routes = [
  {path: '', component: CompletedItemsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompletedItemsRoutingModule { }
