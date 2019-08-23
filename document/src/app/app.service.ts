import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse, HttpEventType } from '@angular/common/http';
import { DocumentDto } from './dtos/documentDto';
import { localhost } from './const/connectionsString';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { IDocument } from './intefaces/documentInterface';
import { IFile } from './intefaces/fileInterface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient, private _snack: MatSnackBar) { }

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
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this._snack.open('Seu Documento foi cadastrado com sucesso.', 'Upload', {
            duration: 5000
          });
        }
      });
  }

  public get(relativeUri: string): Observable<IDocument> {
    return this._http.get<IDocument>(`${localhost}${relativeUri}`);
  }

  public getFile(key: number): Observable<IFile> {
    return this._http.get<IFile>(`${localhost}/upload/get/${key}`); 
  }
}
