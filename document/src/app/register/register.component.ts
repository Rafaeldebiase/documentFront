import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'do-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public title = 'Cadastro';

  public formGroup: FormGroup;

  get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }

  // tslint:disable-next-line: variable-name
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formulario();
  }

  public formulario(): void {
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
        })
      ])
    });
  }


}
