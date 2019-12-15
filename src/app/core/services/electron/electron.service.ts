import { Injectable } from '@angular/core';
import videojs from 'video.js';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote, dialog } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { SubService } from '../sub/sub.service';

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

  ipcSelected(urlVideo:string,vjs:videojs.Player) {
    let path;
    this.ipcRenderon("selected", (event, res) => {
      urlVideo = res.filePaths[0];
      urlVideo = urlVideo.split('\\').join('/');
      path = urlVideo.match(/.*\./)[0]+'srt';
      this.subService.loadSrt(path);
      vjs.pause();
      vjs.src(urlVideo);
    })

  }

}
