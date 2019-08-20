import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ICategory } from '../intefaces/categoryInteface';
import { Category } from '../enums/categoryEnum';
import { FileUploader, FileLikeObject, FileItem } from 'ng2-file-upload';
import { getMatIconNameNotFoundError } from '@angular/material';
import { AppService } from '../app.service';
import { IDocumentDto } from '../dtos/documentDto';


@Component({
  selector: 'do-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public files: FileItem;

  public title = 'Cadastro';
  public formGroup: FormGroup;
  public categories: ICategory[] = [];
  public controlButton = false;

  public uploader: FileUploader = new FileUploader({
    disableMultipart : false,
    autoUpload: false,
    itemAlias: 'attachment',
    allowedFileType: ['pdf', 'doc', 'docx', 'xls', 'xlsx']
  });

  public get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }

  // tslint:disable-next-line: variable-name
  constructor(private _formBuilder: FormBuilder, private service: AppService) { }

  ngOnInit() {
    this._createForm();
    this._createCategorySelect();
  }

  private _createForm(): void {
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          code: [null, Validators.required]
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
      const document: IDocumentDto = this._returnDocumentDto();

      this.service.addDocument(document).subscribe(response => {
        console.log(response);
      });

    }
  }

  private _returnDocumentDto(): IDocumentDto {
    return {
      code: this.formGroup.value[0],
      title: this.formGroup.value[1],
      process: this.formGroup.value[2],
      category: this.formGroup.value[3],
      file: this.formGroup.value[4]
    };
  }

  onFileAdded() {
    this.controlButton = true;
    this.uploader.queue.forEach(item =>
      this.files = item
    );
  }

  public removeClick() {
    this.uploader.clearQueue();
    this.controlButton = false;
  }

}
