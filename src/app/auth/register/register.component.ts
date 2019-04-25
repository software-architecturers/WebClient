import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { from } from 'rxjs';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  constructor(private fb: FormBuilder) { }


  get isDev() {
    return !environment.production;
  }
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
  private static passwordsMatchValidator: ValidatorFn = (control: FormGroup) => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return (password && confirmPassword && password.value !== confirmPassword.value)
      ? { passwordMismatch: true }
      : null;
  }

  ngOnInit() {
  }

  // TODO: register the user
  onSubmit() {

  }
}
