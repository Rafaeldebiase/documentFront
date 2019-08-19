import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { ICategory } from '../intefaces/categoryInteface';
import { Category } from '../enums/categoryEnum';



@Component({
  selector: 'do-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('file', { static: false }) file;

  public files: Set<File> = new Set();

  public title = 'Cadastro';
  public formGroup: FormGroup;
  public formGroupFile: FormGroup;
  public categories: ICategory[] = [];


  public progress;
  public canBeClosed = true;
  public primaryButtonText = 'Upload';
  public showCancelButton = true;
  public uploading = false;
  public uploadSuccessful = false;

  public get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }

  // tslint:disable-next-line: variable-name
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this._createForm();
    this._createCategorySelect();
  }

  private _createForm(): void {
    this.formGroup = this._formBuilder.group({
      file: [null, [Validators.required]],
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
          file: [null]
        })
      ])
    });
  }

  private _createCategorySelect(): void {
    const rn1: ICategory = {
      value: Category.RN1,
      viewValue: Category.RN1
    };
    const rn2: ICategory = {
      value: Category.RN2,
      viewValue: Category.RN2
    };
    const rn3: ICategory = {
      value: Category.RN3,
      viewValue: Category.RN3
    };
    const rn4: ICategory = {
      value: Category.RN4,
      viewValue: Category.RN4
    };
    const rn5: ICategory = {
      value: Category.RN5,
      viewValue: Category.RN5
    };

    this.categories.push(rn1, rn2, rn3, rn4, rn5);
  }

  public clicked() {
    console.log(this.formGroup.value.formArray[0]);
    console.log(this.formGroup.value.formArray[1]);
    console.log(this.formGroup.value.formArray[2]);
    console.log(this.formGroup.value.formArray[3]);
  }

  onFileAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
  }

  public addFile() {
    this.file.nativeElement.click();
  }

}
