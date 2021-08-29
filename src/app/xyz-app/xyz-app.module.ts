import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { XyzAppRoutingModule } from './xyz-app-routing.module';
import { XyzAppComponent } from './xyz-app.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    XyzAppComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    XyzAppRoutingModule
  ]
})
export class XyzAppModule { }
