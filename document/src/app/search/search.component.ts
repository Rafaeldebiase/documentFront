import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { IDocument } from '../intefaces/documentInterface';
import { AppService } from '../app.service';

@Component({
  selector: 'do-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  private data: IDocument [] = [];
  public displayedColumns: string[] = ['code', 'title', 'process', 'category', 'file', 'action'];
  public dataSource = new MatTableDataSource<IDocument>(this.data);

  public formGroup: FormGroup;

  fileUrl;
  constructor(private sanitizer: DomSanitizer, private builder: FormBuilder,
              private snack: MatSnackBar, private service: AppService) {  }
  ngOnInit() {
    const data = 'some text';
    const blob = new Blob([data], { type: 'application/octet-stream' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));

    this._form();
  }

  private _form(): void {
    this.formGroup = this.builder.group({
      search: [null, [Validators.required]]
    });
  }

  private get _search() {
    return this.formGroup.get('search').value;
  }

  public getByCode() {
    const code: any = this._search();

    if (code instanceof Number) {
      const relativeUri = `document/getbycode/${code}`;
      this.service.get(relativeUri).subscribe(response => {
        this.data.push(response);
      });
    }
    else {
      this.snack.open('Você não digitou o código correto ou executou a pesquisa errada');
    }
  }

  public getByTitle() {
    const title: string = this._search();
    const relativeUri = `document/getbytitle/${title}`; 

    this.service.get(relativeUri).subscribe(response => {
      this.data.push(response);
    });
  }

  public getByProcess() {
    const process: string = this._search();
    const relativeUri = `document/getbyprocess/${process}`; 

    this.service.get(relativeUri).subscribe(response => {
      this.data.push(response);
    });
  }

  public getByCategory() {
    const category: string = this._search();
    const relativeUri = `document/getbycategory/${category}`; 

    this.service.get(relativeUri).subscribe(response => {
      this.data.push(response);
    });
  }

}
