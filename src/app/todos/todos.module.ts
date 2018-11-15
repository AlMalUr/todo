import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';

import {FooterModule} from './footer/footer.module';
import {HeaderModule} from './header/header.module';
import {TodosRoutingModule} from './todos-routing.module';
import {TodosComponent} from './todos.component';

@NgModule({
  imports: [
    CommonModule,
    TodosRoutingModule,
    HeaderModule,
    FooterModule,
    SharedModule
  ],
  declarations: [TodosComponent]
})
export class TodosModule { }
