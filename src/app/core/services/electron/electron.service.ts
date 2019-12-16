import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { SubService } from '../sub/sub.service';
import { Plyr } from 'plyr';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  localPath: string;
  videoSources: Plyr.Source[];

  // = [
  //   {
  //     src: 'bTqVqk7FSmY',
  //     provider: 'youtube',
  //   },
  // ]


  get isElectron(): boolean {
    return window && window.process && window.process.type;
  }

  constructor(private subService:SubService) {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
  }

  ipcRenderSend(channel:string) {
    ipcRenderer.send(channel);
  }

  ipcRenderon(channel:string,listen) {
    ipcRenderer.on(channel,listen);
  }

  ipcSelected() {
    let path:string;
    this.ipcRenderon("selected", (event, res) => {
      path = res.filePaths[0];
      path = path.split('\\').join('/');
      this.videoSources = [
        {
          src: path,
          type: "video/mp4",
        },
      ];
      console.log(this.videoSources);
      path = path.match(/.*\./)[0]+'srt';
      this.subService.loadSrt(path);
      console.log(path);
    })

  }

  setVideoPath(videoPath:string) {
    let youtubeId:string = videoPath.match(/(?<==).*/)[0];
    this.videoSources = [
      {
        src: youtubeId,
        provider: 'youtube',
      },
    ];

    this.subService.youtubeSrt(youtubeId);
  }

}
