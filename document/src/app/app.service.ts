import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DocumentDto } from './dtos/documentDto';
import { localhost } from './const/connectionsString';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  public addDocument(document: DocumentDto): Observable<DocumentDto> {
    return this.http.post<DocumentDto>(`${localhost}document/insert/${document.code}`, document)
      .pipe();
  }
}
