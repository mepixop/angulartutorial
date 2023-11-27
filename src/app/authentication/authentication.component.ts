import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, SignupResponse } from '../auth-firebase-connector.service';
import { Router } from '@angular/router';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  isLogin = true;
  form: FormGroup;
  errorMsg: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  switchMode() {
    this.isLogin = !this.isLogin
  }
  submit() {
    this.errorMsg = "";
    let authResponse;
    if (!this.isLogin) {
      authResponse = this.authService.register(this.form.value.email, this.form.value.password);
    } else {
      authResponse = this.authService.login(this.form.value.email, this.form.value.password);
    }
    authResponse.subscribe({
      next: (data: SignupResponse) => {
        this.router.navigate(['/recipes']);
        this.form.reset();
      },
      error: (error) => {
        this.errorMsg = error.message;
      }
    })
  }

  onHandleError() {
    this.errorMsg = null;
  }


}
