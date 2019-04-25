import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { UserService } from '../services/user.service';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';




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
      validators: [RegisterComponent.passwordsMatchValidator]
    }
  );

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private store: Store
  ) { }


  get isDev() {
    return !environment.production;
  }

  private static passwordsMatchValidator: ValidatorFn = (control: FormGroup) => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return (password && confirmPassword && password.value !== confirmPassword.value)
      ? { passwordMismatch: true }
      : null;
  }

  ngOnInit() { }

  onSubmit() {
    const value: RegisterModel = this.registerForm.value;
    this.userService.register(value).subscribe(res => {
      this.store.dispatch(new Navigate(['']));
    });
  }
}
