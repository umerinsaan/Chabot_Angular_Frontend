import { Component, NgZone } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { SpeechRecognitionService } from 'src/app/services/speech-recognition.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  constructor(private speechRecognitionService: SpeechRecognitionService, private ngZone: NgZone) { }

  messages: Message[] = [];
  question: string = '';

  addUserMessage(messagesContainer: HTMLDivElement) {
    this.messages.push({
      sender: 'user',
      value: 'Sample Text From User. Sample Text From User. Sample Text From User. Sample Text From User. Sample Text From User. Sample Text From User. Sample Text From User. Sample Text From User. Sample Text From User.'
    })

    setTimeout(() => {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      console.log(messagesContainer.scrollTop);
      console.log(messagesContainer.scrollHeight);
    }, 0);
  }

  addBotMessage(messagesContainer: HTMLDivElement) {
    this.messages.push({
      sender: 'bot',
      value: 'Sample Text From Bot.'
    });

    setTimeout(() => {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      console.log(messagesContainer.scrollTop);
      console.log(messagesContainer.scrollHeight);
    }, 0);
  }

  textAreaResize(element: HTMLTextAreaElement) {
    const maxHeight = parseInt(getComputedStyle(element).maxHeight, 10);

    element.style.height = "2rem";
    element.style.height = (element.scrollHeight) + "px";

    if (element.scrollHeight > maxHeight) {
      element.style.overflowY = "auto";
    } else {
      element.style.overflowY = "hidden";
    }
  }

  listening: boolean = false;

  toggleListening() {
    this.listening = !this.listening;
    if (this.listening) {
      this.startListening();
    } else {
      this.stopListening();
    }
  }

  startListening() {
    this.speechRecognitionService.startListening().subscribe(
      (text: string) => {
        this.ngZone.run(() => {
          this.question = text;
          this.stopListening();
        });
      },
      (error) => {
        console.log(error);
      }

    );
  }

  stopListening() {
    this.speechRecognitionService.stopListening();
  }

  askQuestion(){
    
  }

}