import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private http: HttpClient) { }

  getAnswer(question: string): Observable<string> {
    return this.http.get<string>("localhost:4200");
  }
}
