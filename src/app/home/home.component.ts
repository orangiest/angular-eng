import { Component, OnInit } from '@angular/core';
import { ElectronService, SubService } from '../core/services';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  urlVideo = 'C:/Users/jimi/Videos/Angular Fundamentals/1. Course Overview001. Course Overview.mp4';
  // tslint:disable-next-line:max-line-length
  urlPoster = 'https://store.storeimages.cdn-apple.com/4667/as-images.apple.com/is/image/AppleInc/aos/published/images/w/at/watch/modelheader/watch-modelheader-series4-hero-201809?wid=629&hei=383&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1536009686693';

  constructor(
    private subService:SubService
  ) {

  }

  ngOnInit(): void {
    this.subService.readLocal();
    console.log(this.subService.marked);
  }


}
