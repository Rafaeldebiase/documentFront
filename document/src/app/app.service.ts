import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IDocumentDto } from './dtos/documentDto';
import { localhost } from './const/connectionsString';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  public addDocument(document: IDocumentDto): Observable<IDocumentDto> {
    return this.http.post<IDocumentDto>(`${localhost}document/insert/${document.code}`, document)
      .pipe();
  }
}
