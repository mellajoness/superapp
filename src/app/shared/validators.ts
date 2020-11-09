import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function ForbiddenReg(regex: RegExp): ValidatorFn {
   return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = regex.test(control.value);
    // console.log(regex.test(control.value));
    return forbidden ? { regex : { value: control.value }} : null;
   };
}

export function PasswordValidator(control: AbstractControl): {[key: string]: any} | null {
   const password = control.get('password');
   const confirmPassword = control.get('confirmPassword');
   if (password.pristine || confirmPassword.pristine) { return null; }
   return password && confirmPassword && password.value !== confirmPassword.value ?
        { misMatch: true } : null ;
}

export function PatternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }
      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);
      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }