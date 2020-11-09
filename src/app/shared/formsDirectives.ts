import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Injectable()

export class FormValidations {

  public billForm: FormGroup;

  constructor(public formBuilder: FormBuilder) { }

  BillSubscription() {
    this.billForm = this.formBuilder.group({
      amount: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
    });
    return this.billForm;
  }
}
