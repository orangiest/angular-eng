import { Component, OnInit, Input } from '@angular/core';
import videojs from 'video.js'
import { ElectronService, SubService } from '../../../core/services';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {

  public vjs: videojs.Player;
  @Input() urlVideo: string;
  @Input() urlPoster: string;
  @Input() time:string;
  private path;

  constructor(private electronService:ElectronService,private subService:SubService) { 
    // this.electronService.ipcSelected(this.urlVideo,this.vjs);
  }

  ngAfterViewInit() {
    const options = {
      'sources' : [{
        'src' : this.urlVideo,
        
        // 'type' : 'application/x-mpegURL'
        'type' : 'video/mp4'
        }
      ],
      'poster' : this.urlPoster,
      'height': 480,
      'width': 850,      
    };
    this.vjs = videojs('my-player', options);
    // 在加载之后 进行改变操作
    this.electronService.ipcSelected(this.urlVideo,this.vjs);
  }

}
