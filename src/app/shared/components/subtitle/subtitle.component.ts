import { Component, OnInit } from '@angular/core';
import { SubService } from '../../../core/services';
import { ClipboardService } from 'ngx-clipboard';
import { Content } from '../../domain/enterty';

@Component({
  selector: 'app-subtitle',
  templateUrl: './subtitle.component.html',
  styleUrls: ['./subtitle.component.scss']
})
export class SubtitleComponent implements OnInit {

  // sentences = [];
  // percentNumber = 0;

  constructor(private subService:SubService,private _clipboardService: ClipboardService) { 
    // this.percentNumber = this.subService.getPercentNumber();
  }



  ngOnInit() {
  }

  get sentences() {
    return this.subService.sentences;
  }

  showSub() {
    // this.sentences = this.subService.sentences;
    // console.log(this.sentences)
  }

  tag(text:Content) {
    this.subService.tag(text);
  }
  
  onRightClick(text){
    this._clipboardService.copyFromContent(text.word);
  }

  // items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
}
