import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  private recognition: any; // Use 'any' for the type

  constructor() {
    this.recognition = new (window as any).webkitSpeechRecognition();
    this.recognition.continuous = true; // Continuous listening
    this.recognition.lang = 'en-US'; // Set the language to your desired locale
  }

  startListening(): Observable<string> {
    return new Observable((observer) => {
      this.recognition.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        observer.next(result);
      };

      this.recognition.onend = () => {
        observer.complete();
      };

      this.recognition.onerror = (event: any) => {
        observer.error(event.error);
      };

      this.recognition.start();
    });
  }

  stopListening() {
    this.recognition.stop();
  }
}