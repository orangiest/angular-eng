import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { PlyrModule } from 'ngx-plyr';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule, 
    SharedModule, 
    FlexLayoutModule,
    MatSidenavModule,
    RouterModule,
    PlyrModule
  ]

})
export class HomeModule { }
