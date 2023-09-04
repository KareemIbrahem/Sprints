import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDoPageRoutingModule } from './to-do-page-routing.module';
import { ToDoPageComponent } from './to-do-page.component';
import { CompletedPipe } from '../pipes/completed.pipe';
import { UnCompletedPipe } from '../pipes/un-completed.pipe';


@NgModule({
  declarations: [
    ToDoPageComponent,
    CompletedPipe,
    UnCompletedPipe
  ],
  imports: [
    CommonModule,
    ToDoPageRoutingModule
  ]
})
export class ToDoPageModule { }
