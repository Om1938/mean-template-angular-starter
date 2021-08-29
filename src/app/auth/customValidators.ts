import { FormControl, FormGroup } from '@angular/forms';

export interface ValidationResult {
  [key: string]: boolean;
}
export class PasswordValidator {
  public static hasNumber(control: FormControl): ValidationResult | null {
    let hasNumber = /\d/.test(control.value);
    if (!hasNumber) {
      return { hasNumber: true };
    }
    return null;
  }
  public static hasUpper(control: FormControl): ValidationResult | null {
    let hasUpper = /[A-Z]/.test(control.value);
    if (!hasUpper) {
      return { hasUpper: true };
    }
    return null;
  }
  public static hasLower(control: FormControl): ValidationResult | null {
    let hasLower = /[a-z]/.test(control.value);
    if (!hasLower) {
      return { hasLower: true };
    }
    return null;
  }
  public static hasSymbol(control: FormControl): ValidationResult | null {
    let hasSymbol = /[-+_!@#$%^&*., ?]/.test(control.value);
    if (!hasSymbol) {
      return { hasSymbol: true };
    }
    return null;
  }
  public static MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
