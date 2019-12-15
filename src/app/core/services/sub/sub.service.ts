import { Injectable } from '@angular/core';
import * as fs from 'fs';
import * as Subtitle from 'subtitle'
import { Content } from '../../../shared/domain/enterty';

@Injectable({
  providedIn: 'root'
})
export class SubService {

  sentences: any[] = null;
  marked = [];
  percentNumber = 0;

  constructor() { }

  tokenize(str) {

    var punct = '\\[' + '\\!' + '\\"' + '\\#' + '\\$' + // since javascript does not
      '\\%' + '\\&' + '\\\'' + '\\(' + '\\)' + // support POSIX character
      '\\*' + '\\+' + '\\,' + '\\\\' + '\\-' + // classes, we'll need our
      '\\.' + '\\/' + '\\:' + '\\;' + '\\<' + // own version of [:punct:]
      '\\=' + '\\>' + '\\?' + '\\@' + '\\[' +
      '\\]' + '\\^' + '\\_' + '\\`' + '\\{' +
      '\\|' + '\\}' + '\\~' + '\\]',

      re = new RegExp( // tokenizer
        '\\s*' +           // discard possible leading whitespace
        '(' +              // start capture group #1
        '\\.{3}' +          // ellipsis (must appear before punct)
        '|' +              // alternator
        '\\w+\\-\\w+' +     // hyphenated words (must appear before punct)
        '|' +              // alternator
        '\\w+\'(?:\\w+)?' + // compound words (must appear before punct)
        '|' +              // alternator
        '\\w+' +            // other words
        '|' +              // alternator
        '[' + punct + ']' +  // punct
        ')' // end capture group #1
      ),

      tokens = str.split(re),  // split string using tokenizing regex
      result = [];

    // add non-empty tokens to result
    for (var i = 0, len = tokens.length; i++ < len;) {
      if (tokens[i]) {
        result.push(tokens[i]);
      }
    }

    return result;

  } // end tokenize()

  
 pattern2 = new RegExp("[A-Za-z]+");

  // 格式化字幕
  loadSrt(path: string) {
    let res = fs.readFileSync(path, 'utf8');
    this.sentences = Subtitle.parse(res)
    //  console.log(this.sentences);


    this.sentences.forEach(e => {
      e.content = this.tokenize(e.text);
    });

    for (let sentence of this.sentences) {
      let text:string[] = sentence.content
      sentence.content = [];
      for (const word of text) {
        let content: Content = this.makeContent(word);
        sentence.content.push(content);
      }
    }

    this.calPercent();
  }

  getSentences() {
    return this.sentences;
  }

  //debug
  testFun() {
    let s = "This is a test, test is only a test?"
    console.log(s.match(/\b(\w+)\b|\b\S/g))
  }

  addMarked(word:string) {
    this.marked.push(word);
    this.refreshSrt();
    this.calPercent();
  }

  removeMarked(word:string) {
    let position = this.marked.indexOf(word);
    if ( ~position ) this.marked.splice(position, 1);
    this.refreshSrt();
    this.calPercent();
  }

  makeContent(word:string):Content {
    let content: Content = new Content;
        content.word = word;
        if (this.marked.indexOf(content.word) == -1) {
          content.isMark = false;
        } else {
          content.isMark = true;
        }

        if(this.pattern2.test(content.word)){
          content.isWord = true;
        }else {
          content.isWord = false;
        }

    return content;
  }
  
  refreshSrt() {
    for (let sentence of this.sentences) {
      let text:Content[] = sentence.content
      sentence.content = [];
      for (const word of text) {
        let content: Content = this.makeContent(word.word);
        sentence.content.push(content);
      }
    }

    console.log(this.sentences);
  }

  saveLocal() {
    let jsondata = JSON.stringify(this.marked);
    fs.writeFile("mark.json", jsondata, function(err) {
    if (err) {
        console.log(err);
    }
    });
  }

  readLocal() {
    this.marked = JSON.parse(fs.readFileSync("mark.json","utf8"));
    ;
  }

  calPercent() {
    let total:number = 0;
    let mark:number = 0;
    for(let sentence of this.sentences) {
      total += sentence.content.length;
      for(let item of sentence.content) {
        if(item.isMark == true || item.isWord == false) {
          mark++;
        }
      }
    }
    this.percentNumber = mark/total;
  }

  getPercentNumber() {
    return this.percentNumber;
  }

  tag(text:Content) {
    if(text.isMark) {
      text.isMark = !text.isMark;
      this.removeMarked(text.word);
    }else {
      text.isMark = !text.isMark;
      this.addMarked(text.word);
    }
    this.sentences = this.sentences;
    console.log(this.marked);
  }
}
