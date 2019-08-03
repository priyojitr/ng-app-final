import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})

export class UserRegisterComponent implements OnInit {

  user: User;

  registerForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    userid: new FormControl('', [Validators.required]),
    userpassword: new FormControl('', [Validators.required]),
    userrole: new FormControl('', [Validators.required]),
  });

  // getter/setter
  get firstname() {
    return this.registerForm.get('firstname');
  }
  set firstname(fmFirstName: any) {
    this.registerForm.setValue({
      firstname: fmFirstName.value
    });
  }
  get lastname() {
    return this.registerForm.get('lastname');
  }
  set lastname(fmLastName: any) {
    this.registerForm.setValue({
      lastname: fmLastName.value
    });
  }
  get userid() {
    return this.registerForm.get('userid');
  }
  set userid(fmUserId: any) {
    this.registerForm.setValue({
      userid: fmUserId.value
    });
  }
  get userpassword() {
    return this.registerForm.get('userpassword');
  }
  set userpassword(fmUserPwd: any) {
    this.registerForm.setValue({
      userpassword: fmUserPwd.value
    });
  }
  get userrole() {
    return this.registerForm.get('userrole');
  }
  set userrole(fmUserRole: any) {
    this.registerForm.setValue({
      userrole: fmUserRole.value
    });
  }

  constructor(private userSerivce: UserService, private router: Router) {
    this.user = new User();
  }

  ngOnInit() {
  }

  // get error messages for field validations
  getFirstNameBlankMessage() {
    return this.firstname.hasError('required') ? 'first name field cannot be blank' : '';
  }
  getLastNameBlankMessage() {
    return this.lastname.hasError('required') ? 'last name field cannot be blank' : '';
  }
  getUserIdBlankMessage() {
    return this.userid.hasError('required') ? 'user id field cannot be blank' : '';
  }
  getUserPwdBlankMessage() {
    return this.userpassword.hasError('required') ? 'password field cannot be blank' : '';
  }
  getUserRoleBlankMessage() {
    return this.userrole.hasError('required') ? 'role field cannot be blank' : '';
  }
  createUser(regFmRef: FormGroupDirective): void {
    console.log('calling client service -- ');
    this.userSerivce.createUser(this.user).subscribe(
      data => {
        alert('user created');
        regFmRef.resetForm();
        this.registerForm.reset();
        this.user = new User();
      }, err => {
        alert('error occurred while creating user.');
        console.log('error creating user:', err);
      });
  }

  regFormReset(fmref: FormGroupDirective) {
    fmref.resetForm();
    this.registerForm.reset();
  }

}
