import {NgModule} from '@angular/core';

import {httpInterceptorProviders} from './interceptors';
import {TodoItemsService} from './services/todo-items.service';

@NgModule({
  providers: [
    httpInterceptorProviders,
    TodoItemsService
  ]
})
export class CoreModule { }
