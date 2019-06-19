import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { UserService } from '../services/user.service';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import RegisterModel from '../models/register.model';
import { HttpClient } from '@angular/common/http';


const passwordsMatchValidator: ValidatorFn = (control: FormGroup) => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return (password && confirmPassword && password.value !== confirmPassword.value)
    ? { passwordMismatch: true }
    : null;
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    // TODO: proper password regex
    password: ['', [Validators.required, /*Validators.pattern('^(?=.*?[a-z])(?=.*?[0-9]).{8,450}$')*/]],
    confirmPassword: ['', [Validators.required, /*Validators.pattern('^(?=.*?[a-z])(?=.*?[0-9]).{8,450}$'))*/]],
  }, {
      validators: [passwordsMatchValidator]
    }
  );

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private store: Store
  ) {
  }



  get isDev() {
    return !environment.production;
  }


  private get name() {
    return this.registerForm.get('name');
  }

  private get email() {
    return this.registerForm.get('email');
  }

  private get password() {
    return this.registerForm.get('password');
  }

  private get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  ngOnInit() { }

  onSubmit() {
    const value: RegisterModel = {
      login: this.name.value,
      email: this.email.value,
      password: this.password.value,
      confirmPassword: this.confirmPassword.value,
    };
    this.userService.register(value).subscribe(() => {
      this.store.dispatch(new Navigate(['']));
    });
  }
}
