import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder) { }


  get isDev() {
    return !environment.production;
  }
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    // TODO: proper password regex
    password: ['', [Validators.required]],
  }
  );

  ngOnInit() {
  }

  // TODO: login the user
  onSubmit() {

  }
}
