import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserLogin } from '../model/login.model';
import { map } from 'rxjs/internal/operators/map';
import { error } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  // getter/setter
  get username() {
    return this.loginForm.get('username');
  }

  set username(fmUsername: any) {
    this.loginForm.setValue({
      username: fmUsername.value
    });
  }

  get password() {
    return this.loginForm.get('password');
  }

  set password(fmPassword: any) {
    this.loginForm.setValue({
      password: fmPassword.value
    });
  }

  constructor(private router: Router, private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authService.logOut();
  }

  // get error messages for field validations
  getUsernameBlankMessage() {
    return this.username.hasError('required') ? 'username field cannot be blank' : '';
  }

  getPasswordBlankMessage() {
    return this.password.hasError('required') ? 'password field cannot be blank' : '';
  }

  authenticate() {
    this.userLogin = new UserLogin(this.username.value, this.password.value);
    console.log(this.userLogin);
    console.log(`call auth service ....`);
    this.authService.authenticate(this.userLogin).subscribe(
      data => {
        this.authService.setBearerToken(data[`token`]);
        this.authService.setAuthentication(data[`authentication`]);
        this.authService.setUserId(this.username.value);
        if (data[`authentication`] === true) {
          this.router.navigate(['dashboard']);
        }
      }, err => {
        console.log('error....', err);
        alert(`${err.error.message}`);
        this.authService.setAuthentication(`false`);
      }
    );
  }
}
