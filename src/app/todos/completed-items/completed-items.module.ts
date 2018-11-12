import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CompletedItemsRoutingModule } from './completed-items-routing.module';
import { CompletedItemsComponent } from './completed-items.component';

@NgModule({
  imports: [
    CommonModule,
    CompletedItemsRoutingModule
  ],
  declarations: [CompletedItemsComponent]
})
export class CompletedItemsModule { }
