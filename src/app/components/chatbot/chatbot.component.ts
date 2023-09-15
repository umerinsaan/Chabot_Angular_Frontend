import { Component, NgZone, ElementRef, AfterViewInit } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { ChatbotService } from 'src/app/services/chatbot.service';
import { SpeechRecognitionService } from 'src/app/services/speech-recognition.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements AfterViewInit {
  constructor(
    private speechRecognitionService: SpeechRecognitionService,
    private ngZone: NgZone,
    private chatBotService: ChatbotService,
    private elementRef: ElementRef<HTMLDivElement | HTMLTextAreaElement>
  ) { }

  textAreaElement!: HTMLTextAreaElement;
  messagesContainer!: HTMLDivElement;

  ngAfterViewInit(): void {
    this.textAreaElement = this.elementRef.nativeElement.querySelector("#message-input-field") as HTMLTextAreaElement;
    this.messagesContainer = this.elementRef.nativeElement.querySelector("#messages-container") as HTMLDivElement;
  }

  messages: Message[] = [];
  question: string = '';

  addUserMessage() {
    this.messages.push({
      sender: 'user',
      value: 'Sample Text From User. Sample Text From User. Sample Text From User. Sample Text From User. Sample Text From User. Sample Text From User. Sample Text From User. Sample Text From User. Sample Text From User.'
    })
    this.messagesContainerScrollToBottom();
  }

  messagesContainerScrollToBottom(): void {
    setTimeout(() => {
      if (this.messagesContainer) {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
      }
    }, 0);
  }

  addBotMessage() {
    this.messages.push({
      sender: 'bot',
      value: 'Sample Text From Bot.'
    });

    this.messagesContainerScrollToBottom();
  }

  textAreaResize() {
    if (this.textAreaElement === null || this.textAreaElement === undefined) return;

    const maxHeight = parseInt(getComputedStyle(this.textAreaElement).maxHeight, 10);

    this.textAreaElement.style.height = "2rem";
    this.textAreaElement.style.height = (this.textAreaElement.scrollHeight) + "px";

    if (this.textAreaElement.scrollHeight > maxHeight) {
      this.textAreaElement.style.overflowY = "auto";
    } else {
      this.textAreaElement.style.overflowY = "hidden";
    }
  }

  resetTextAreaSize() {
    if (this.textAreaElement) {
      this.textAreaElement.style.height = '';
      this.textAreaElement.style.overflowY = 'hidden';
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

  askQuestion() {
    if (this.question.length === 0) return;

    const req: string = this.question;
    this.messages.push({
      sender: 'user',
      value: req
    });

    this.resetTextAreaSize();
    this.messagesContainerScrollToBottom();

    this.question = '';

    this.chatBotService.sendQuestionAndGetAnswer({
      sender: 'bot',
      value: req
    }).subscribe({
      next: (response) => {
        this.messages.push(response);
        this.messagesContainerScrollToBottom();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  enterKeyHandler_For_TextAreaElement(event: Event): void {
    event.preventDefault();
    this.askQuestion();
  }
}