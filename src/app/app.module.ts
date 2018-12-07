import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { TodoItemsState } from './ngxs/todo-items/todo-items.state';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    NgxsModule.forRoot([TodoItemsState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
