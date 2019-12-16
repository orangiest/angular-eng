import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ElectronService } from '../../../core/services';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  youtubeUrl;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private electronService:ElectronService,
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    this.electronService.setVideoPath(this.youtubeUrl);
    this.dialogRef.close();
  }
}
