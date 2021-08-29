import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastService } from 'src/app/toast.service';
import { PasswordValidator } from '../../customValidators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  disableSubmit: boolean = false;
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private toastr: ToastService,
    private router: Router
  ) {}
  registerForm: FormGroup = this.fb.group(
    {
      username: [
        '',
        [
          Validators.email,
          Validators.maxLength(254),
          Validators.minLength(3),
          Validators.required,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          PasswordValidator.hasLower,
          PasswordValidator.hasNumber,
          PasswordValidator.hasUpper,
          PasswordValidator.hasSymbol,
        ],
      ],
      repeat_password: ['', Validators.required],
    },
    {
      validator: PasswordValidator.MustMatch('password', 'repeat_password'),
    }
  );
  get f() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {}
  submitForm() {
    if (this.registerForm.valid) {
      this.disableSubmit = true;
      this._authService.register(this.registerForm.value).subscribe(
        (res) => {
          this.toastr.showSuccess(
            'Registration Successful, Please login now.. '
          );
          this.router.navigate(['auth', 'login']);
        },
        (err) => {
          console.error(err);
          this.toastr.showError(err.message);
        },
        () => {
          this.disableSubmit = false;
        }
      );
    } else {
      console.log(this.registerForm.controls.username);
    }
  }
}
