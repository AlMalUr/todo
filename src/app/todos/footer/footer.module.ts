import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { FooterComponent } from './footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatTabsModule
  ],
  exports: [
    FooterComponent
  ],
  declarations: [FooterComponent]
})
export class FooterModule {
}
