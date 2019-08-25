import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { AppService } from './app.service';
import { IDocument } from './intefaces/documentInterface';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, finalize, tap } from 'rxjs/operators';
import { Category } from './enums/categoryEnum';
import { Injectable } from '@angular/core';

export class DocumentDataSource extends DataSource<IDocument> {

    constructor(private service: AppService) {
        super();
    }

    private documentSubject =  new BehaviorSubject<IDocument[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    public connect(collectionViewer: CollectionViewer): Observable<IDocument[]> {
        return this.documentSubject.asObservable();
    }

    public disconnect(collectionViewer: CollectionViewer): void {
        this.documentSubject.complete();
        this.loadingSubject.complete();
    }

    public loadDocument() {
        this.loadingSubject.next(true);


        this.service.getAll().pipe(
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(document =>
            {
                this.documentSubject.next(document);
            });
    }

    public CodeSearch(code: number) {
        // const document = data.filter(field => field.code === code);
        // this.documentSubject.next(document);
    }
}
