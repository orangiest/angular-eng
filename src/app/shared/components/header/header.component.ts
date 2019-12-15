import { Component, OnInit } from '@angular/core';
import { ElectronService, SubService } from '../../../core/services';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(
    private electronService: ElectronService,
    private subService: SubService,
    ) {
      
     }

  ngOnInit() {
    
  }

  open() {
    this.subService.saveLocal();
    this.electronService.ipcRenderSend("openDialog"); // video component
  }

  get percentNumber(): number {
    return this.subService.percentNumber;
  }
  

}
