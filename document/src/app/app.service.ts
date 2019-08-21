import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { DocumentDto } from './dtos/documentDto';
import { localhost } from './const/connectionsString';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  constructor(private http: HttpClient) { }

  public addDocument(document: DocumentDto): Observable<DocumentDto> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<DocumentDto>(`${localhost}document/insert/${document.code}`, document, httpOptions)
      .pipe(
        // catchError(this.handleError)
      );
  }

  public upload(formData: FormData) {
    return this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          // this.message = 'Upload success.';
          // this.onUploadFinished.emit(event.body);
        }
      });
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
        console.error('Ocorreu um erro:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
        console.error(
        `O servidor retornou o código de erro: ${error.status}, ` +
        `com o corpo: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
        'Tente novamente mais tarde');
  };
}
