import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DocumentDataSource } from '../DocumentDataSource';
import { AppService } from '../app.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatPaginator } from '@angular/material';
import { IDocument } from '../intefaces/documentInterface';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'do-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public document: IDocument;
  public fileUrl;
  public displayedColumns: string[] = ['code', 'title', 'process', 'category', 'file', 'action'];
  public dataSource: DocumentDataSource;
  public edit = false;
  public save = true;
  public formGroupEdit: FormGroup;

  constructor(private service: AppService,  private builder: FormBuilder, private route: ActivatedRoute,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    // this.document = this.route.snapshot.data['IDocument'];
    this.dataSource = new DocumentDataSource(this.service);
    this.dataSource.loadDocument();
    this._formEdit();
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      tap(
        () => this.loadDocumentPage())
      ).subscribe();
  }

  private loadDocumentPage() {
    // this.dataSource.loadDocument();

  }

  private _formEdit(): void {
    this.formGroupEdit = this.builder.group({
      code: [null],
      title: [null],
      process: [null],
      category: [null]
    });
  }

  public downloadCick(key: number) {
    this.service.getFile(key).subscribe(
      response => {
        const blob = new Blob([response], { type: 'application/pdf' });
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    });
  }

}
