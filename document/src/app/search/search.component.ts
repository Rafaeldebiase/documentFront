import { Component, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { IDocument } from '../intefaces/documentInterface';
import { AppService } from '../app.service';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Category } from '../enums/categoryEnum';
import { tap } from 'rxjs/operators';
import { IPatch } from '../intefaces/patchInterface';
import { Observable, Subject } from 'rxjs';
import { DocumentDataSource } from '../DocumentDataSource';

@Component({
  selector: 'do-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public filterSubject = new Subject();
  public formGroup: FormGroup;

  constructor(private sanitizer: DomSanitizer, private builder: FormBuilder,
              private snack: MatSnackBar, private service: AppService) { }

  ngOnInit() {
    this._form();

  }

  private _form(): void {
    this.formGroup = this.builder.group({
      search: [null]
    });
  }

  private isNumeric(str: string): boolean {
      const numberTest = /^[0-9]+$/;
      return numberTest.test(str);
  }

  public filter(value: string) {
    this.service.filter(value);
  }

}

