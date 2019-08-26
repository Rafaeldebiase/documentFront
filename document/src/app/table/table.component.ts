import { Component, OnInit, ViewChild, AfterViewInit, Input, ElementRef } from '@angular/core';
import { DocumentDataSource } from '../DocumentDataSource';
import { AppService } from '../app.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { IDocument } from '../intefaces/documentInterface';
import { tap } from 'rxjs/operators';
import { SearchComponent } from '../search/search.component';
import { DeleteModalComponent } from '../modal/delete-modal/delete-modal.component';

@Component({
  selector: 'do-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild('download', {static: true}) private download: ElementRef;

  @Input() teste: string;

  public document: IDocument;
  public fileUrl;
  public displayedColumns: string[] = ['code', 'title', 'process', 'category', 'file', 'action'];
  public dataSource = new MatTableDataSource<IDocument>();
  public edit = false;
  public save = true;
  public formGroupEdit: FormGroup;

  constructor(private service: AppService,  private builder: FormBuilder,
              public dialog: MatDialog) { }

  ngOnInit() {
    this._formEdit();
    this._getAll();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.filter();
  }

  private loadDocumentPage() {

  }

  private _formEdit(): void {
    this.formGroupEdit = this.builder.group({
      code: [null],
      title: [null],
      process: [null],
      category: [null]
    });
  }

  private _getAll(): void {
    this.service.getAll().subscribe(response => {
      this.dataSource.data = response;
    });
  }

  public downloadClick(key: number) {
    this.service.getFile(key).subscribe(
      response => {
        window.open(window.URL.createObjectURL(response));
    });
  }

  private filter() {
    this.service.filter$.subscribe((value: string) =>
      this.dataSource.filter = value.trim().toLocaleLowerCase()
    );
  }

  public delete(title: string): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '250px',
      data: {documento: title}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
