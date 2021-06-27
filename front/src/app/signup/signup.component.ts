import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SignupService} from '../Services/Signup/signup.service';
import {SignUpInfo} from '../Models/signup-info';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signUpForm: FormGroup = this.fb.group( {
    name: ['', Validators.required],
    username: ['', Validators.required],
    email : ['', [Validators.required, Validators.email]],
    password : ['', Validators.required],
  }) ;

  constructor(private router: Router,
              private fb: FormBuilder,
              private  signupService: SignupService) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  signup(){
    // tslint:disable-next-line:max-line-length
    const user = new SignUpInfo(this.signUpForm.value.name, this.signUpForm.value.username, this.signUpForm.value.email, this.signUpForm.value.password);
    this.signupService.signUp(user);
  }
}
