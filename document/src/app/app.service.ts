import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DocumentDto } from './dtos/documentDto';
import { localhost } from './const/connectionsString';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AplicationErrorHandler } from './appErrorHandler';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private _http: HttpClient, private _sanck: MatSnackBar) { }

  public addDocument(document: DocumentDto): Observable<DocumentDto> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._http.post<DocumentDto>(`${localhost}document/insert/${document.code}`, document,
      httpOptions);
  }

  public upload(formData: FormData, document: DocumentDto) {
    return this._http.post(`${localhost}upload/insert/${document.code}`, formData, {reportProgress: true, observe: 'events'})
      .subscribe(data => {
        this._sanck.open('Seu Documento foi cadastrado com sucesso.', 'Upload', {
          duration: 5000
        })
      });
  }
}
