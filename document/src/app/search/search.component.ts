import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { IDocument } from '../intefaces/documentInterface';
import { AppService } from '../app.service';
import { Category } from '../enums/categoryEnum';

@Component({
  selector: 'do-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  
  private data: IDocument[] = [];
  public fileUrl;
  public displayedColumns: string[] = ['code', 'title', 'process', 'category', 'file', 'action'];
  public dataSource = new MatTableDataSource<IDocument>(this.data);
  
  public formGroup: FormGroup;
  public formGroupEdit: FormGroup;
  public edit = false;
  public save = true;
  
  constructor(private sanitizer: DomSanitizer, private builder: FormBuilder,
    private snack: MatSnackBar, private service: AppService) { }
  
    ngOnInit() {
    this._form();
    this._formEdit();
  }

  private _form(): void {
    this.formGroup = this.builder.group({
      search: [null, [Validators.required]]
    });
  }

  private _formEdit(): void {
    this.formGroupEdit = this.builder.group({
      code: [null],
      title: [null],
      process: [null],
      category: [null]
    });
  }

  private isNumeric(str: string): boolean {
    var numberTest = /^[0-9]+$/;
    return numberTest.test(str)
  }

  public getByCodeClick() {
    const code: string = this.formGroup.get('search').value;

    if (this.isNumeric(code)) {
      const relativeUri = `document/getbycode/${code}`;
      this.service.get(relativeUri).subscribe(response => {
        this.data.push(response);
      });
    }
    else {
      this.snack.open('Para executar esta pequisa favor informar o código, deve conter apenas números',
        'Pesquisa pelo código', { duration: 3000 });
    }

  }

  public getByTitleClick() {
    const title: string = this.formGroup.get('search').value;

    if (title !== null) {
      const relativeUri = `document/getbytitle/${title}`;
      this.service.get(relativeUri).subscribe(response => {
        this.data.push(response);
      });
    }
    else {
      this.snack.open('Favor digitar o título a ser pesquisado',
        'Pesquisa pelo titulo', { duration: 3000 });
    }
  }

  public getByProcessClick() {
    const process: string = this.formGroup.get('search').value;

    if (process !== null) {
      const relativeUri = `document/getbyprocess/${process}`;
      this.service.get(relativeUri).subscribe(response => {
        this.data.push(response);
      });
    }
    else {
      this.snack.open('Favor digitar o processo a ser pesquisado',
        'Pesquisa pelo processo', { duration: 3000 });
    }
  }

  public getByCategoryClick() {
    const rn1Value = Category.RN1;
    const rn2Value = Category.RN2;
    const rn3Value = Category.RN3;
    const rn4Value = Category.RN4;
    const rn5Value = Category.RN5;

    const category: string = this.formGroup.get('search').value;

    if (category !== null) {
      if (category === Category[rn1Value] || category === Category[rn2Value] ||
        category === Category[rn3Value] || category === Category[rn4Value] ||
        category === Category[rn5Value]) {
        const relativeUri = `document/getbycategory/${category}`;
        this.service.get(relativeUri).subscribe(response => {
          this.data.push(response);
        });
      }
      else {
        this.snack.open('Favor digitar o nome da categoria correto ou realizar a pesquisa correta',
          'Pesquisa pelo processo', { duration: 3000 });
      }
    }
    else {
      this.snack.open('Favor digitar o processo a ser pesquisado',
        'Pesquisa pelo processo', { duration: 3000 });
    }
  }

  public downloadCick(key: number) {
    this.service.getFile(key).subscribe( response => {
      const blob = new Blob([response.blob], { type: response.contentType });
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    });
  }

  public editClick() {
    this.edit = true;
    this.save = false;
  }

  public saveClick(row: any) {
    console.log(row);
  }

}
