import { Component, OnInit } from '@angular/core';
import { ElectronService, SubService } from '../../../core/services';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(
    private electronService: ElectronService,
    private subService: SubService,
    private dialog:MatDialog
    ) {
      
     }

  ngOnInit() {
    
  }

  openFile() {
    this.subService.saveLocal();
    this.electronService.ipcRenderSend("openDialog"); // video component
  }

  get percentNumber(): number {
    return this.subService.percentNumber;
  }
  
  openDialog(): void {
    this.subService.saveLocal();

    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  

  openUrl() {

  }

  

}


