import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { VideoComponent } from './components/video/video.component';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule, MatIconModule, MatButtonModule } from '@angular/material';
import { SubtitleComponent } from './components/subtitle/subtitle.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ClipboardModule } from 'ngx-clipboard';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, VideoComponent, HeaderComponent, SubtitleComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ScrollingModule,
    ClipboardModule,
    FlexLayoutModule
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    VideoComponent,
    HeaderComponent,
    SubtitleComponent
  ]
})
export class SharedModule { }
