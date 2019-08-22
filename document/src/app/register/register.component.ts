import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray } from '@angular/forms';
import { ICategory } from '../intefaces/categoryInteface';
import { Category } from '../enums/categoryEnum';
import { AppService } from '../app.service';
import { DocumentDto } from '../dtos/documentDto';



@Component({
  selector: 'do-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  public fileData: FormData;
  public title = 'Cadastro';
  public formGroup: FormGroup;
  public categories: ICategory[] = [];
  public controlButton = false;
  public fileOk: string;


  public get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }

  private _formArray: FormArray;

  constructor(private _formBuilder: FormBuilder, private _service: AppService) { }

  ngOnInit() {
    this._createForm();
    this._createCategorySelect();
  }

  private _createForm(): void {
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          code: [null, [Validators.required, Validators.pattern('^[0-9]*')]]
        }),
        this._formBuilder.group({
          title: [null, Validators.required]
        }),
        this._formBuilder.group({
          process: [null, Validators.required]
        }),
        this._formBuilder.group({
          category: [null, Validators.required]
        }),
        this._formBuilder.group({
          file: [null, [Validators.required]]
        })
      ])
    });

    this._formArray = this.formGroup.get('formArray') as FormArray;
  }

  private _createCategorySelect(): void {
    const rn1Value = Category.RN1;
    const rn2Value = Category.RN2;
    const rn3Value = Category.RN3;
    const rn4Value = Category.RN4;
    const rn5Value = Category.RN5;

    const rn1: ICategory = {
      value: rn1Value,
      viewValue: Category[rn1Value]
    };
    const rn2: ICategory = {
      value: rn2Value,
      viewValue: Category[rn2Value]
    };
    const rn3: ICategory = {
      value: rn3Value,
      viewValue: Category[rn3Value]
    };
    const rn4: ICategory = {
      value: rn4Value,
      viewValue: Category[rn4Value]
    };
    const rn5: ICategory = {
      value: rn5Value,
      viewValue: Category[rn5Value]
    };

    this.categories.push(rn1, rn2, rn3, rn4, rn5);
  }

  public clicked() {
    if (this.formGroup.valid) {
      const document: DocumentDto = this._returnDocumentDto();

      this._service.addDocument(document).subscribe(response => {
        this._service.upload(this.fileData, response);
      });

    }
  }

  private _returnDocumentDto(): DocumentDto {
    const document = new DocumentDto();
    document.code = parseInt(this._formArray.value[0].code, 0);
    document.title = this._formArray.value[1].title;
    document.process = this._formArray.value[2].process;
    document.category = this._formArray.value[3].category;
    return document;
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    this.fileData = new FormData();
    const fileToUpload = files[0] as File;
    this.fileOk = fileToUpload.name;
    this.fileData.append('file', fileToUpload, fileToUpload.name);
  }

  public removeFile() {
    this.fileOk = '';
    this.fileData = new FormData();
  }



}
