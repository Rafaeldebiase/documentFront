import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DocumentDto } from './dtos/documentDto';
import { localhost } from './const/connectionsString';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AplicationErrorHandler } from './appErrorHandler';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public message: Subject<any> = new Subject();

  constructor(private http: HttpClient) { }

  public addDocument(document: DocumentDto): Observable<DocumentDto> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<DocumentDto>(`${localhost}document/insert/${document.code}`, document,
      httpOptions);
  }

  public upload(formData: FormData, document: DocumentDto) {
    return this.http.post(`${localhost}upload/insert/${document.code}`, formData, {reportProgress: true, observe: 'events'})
      .subscribe(data => {
        console.log(data.type);
        this.message.next('O documento fo criado com sucesso');
      });
  }
}
