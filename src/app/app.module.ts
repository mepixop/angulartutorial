import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskmasterComponent } from './taskmaster/taskmaster.component';
import { MessengerComponent } from './taskmaster/messenger/messenger.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskmasterComponent,
    MessengerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
