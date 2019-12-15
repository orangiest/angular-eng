import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule, 
    SharedModule, 
    HomeRoutingModule,
    FlexLayoutModule,
    MatSidenavModule
  ]

})
export class HomeModule { }
