import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllItemsRoutingModule } from './all-items-routing.module';
import { AllItemsComponent } from './all-items.component';

@NgModule({
  imports: [
    CommonModule,
    AllItemsRoutingModule
  ],
  declarations: [AllItemsComponent]
})
export class AllItemsModule { }
