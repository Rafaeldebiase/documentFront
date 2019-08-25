import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse, HttpEventType } from '@angular/common/http';
import { DocumentDto } from './dtos/documentDto';
import { localhost } from './const/connectionsString';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { IDocument } from './intefaces/documentInterface';
import { IFile } from './intefaces/fileInterface';
import { map } from 'rxjs/operators';
import { Category } from './enums/categoryEnum';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private dataSubject = new Subject();
  filter$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

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
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this.snack.open('Seu Documento foi cadastrado com sucesso.', 'Upload', {
            duration: 5000
          });
        }
      });
  }

  public getAll(): Observable<IDocument[]> {
    return this.http.get<IDocument[]>(`${localhost}document/getall`);
  }

  public getFile(key: number): Observable<Blob> {
    return this.http.get<Blob>(`${localhost}file/get/${key}`);
  }

  // public patch(key: number, ): Observable<DocumentDto> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json'
  //     })
  //   };

  //   // return this.http.patch<DocumentDto>(`${localhost}/edit/${key}`,)
  // }

  public filter(value: string) {
    this.dataSubject.next(value);
  }
}
