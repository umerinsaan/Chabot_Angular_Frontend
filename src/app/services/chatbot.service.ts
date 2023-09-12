import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { baseApiUrl } from '../environments/environments';
import { HttpHeaders } from '@angular/common/http';
import { Message } from '../models/Message';
@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private http: HttpClient) { }

  sendQuestionAndGetAnswer(req: Message): Observable<Message> {
    return this.http.post<Message>(baseApiUrl + 'api/Chatbot/ask', req);
  }
}
