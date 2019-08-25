import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { IDocument } from '../intefaces/documentInterface';
import { AppService } from '../app.service';
import { DataSource } from '@angular/cdk/collections';
import { Category } from '../enums/categoryEnum';
import { tap } from 'rxjs/operators';
import { IPatch } from '../intefaces/patchInterface';
import { Observable } from 'rxjs';
import { DocumentDataSource } from '../DocumentDataSource';

@Component({
  selector: 'do-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public formGroup: FormGroup;

  private dataSource: DocumentDataSource;

  constructor(private sanitizer: DomSanitizer, private builder: FormBuilder,
              private snack: MatSnackBar, private service: AppService) { }

  ngOnInit() {
    this.dataSource = new DocumentDataSource(this.service);
    this._form();

  }

  private _form(): void {
    this.formGroup = this.builder.group({
      search: [null, [Validators.required]]
    });
  }

  private isNumeric(str: string): boolean {
      const numberTest = /^[0-9]+$/;
      return numberTest.test(str);
  }

  public codeClick() {
    const code = this.formGroup.get('search').value;
    this.dataSource.CodeSearch(code);
  }

}

