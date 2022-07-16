import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastService } from 'src/app/toast.service';
import { PasswordValidator } from '../../customValidators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
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
  });
  disableSubmit: boolean = false;
  returnUrl: any;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private toastr: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  get f() {
    return this.loginForm.controls;
  }
  submitForm() {

    console.log(this.loginForm);

    if (this.loginForm.valid) {
      this.disableSubmit = true;
      this._authService
        .login(this.loginForm.value)
        .pipe(first())
        .subscribe(
          (res) => {
            this.router.navigate(['xyz', 'proctected-home']);
            this.toastr.showSuccess('Navigated to success ... ');
            this.disableSubmit = false;
          },
          (err) => {
            this.toastr.showError(err.message);
            this.disableSubmit = false;
          }
        );
    } else {
      console.log(this.loginForm.controls.username);
    }
  }
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
}
