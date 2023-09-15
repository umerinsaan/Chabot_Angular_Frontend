import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  constructor() {
  }

  speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);

    if ('speechSynthesis' in window) {
      speechSynthesis.speak(utterance);
    }
  }


}
