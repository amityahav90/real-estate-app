import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });

    this.signupForm = new FormGroup({
      'username': new FormControl(null, {validators: [Validators.required]}),
      'firstName': new FormControl(null, {validators: [Validators.required]}),
      'lastName': new FormControl(null, {validators: [Validators.required]}),
      'email': new FormControl(null, {validators: [Validators.required, Validators.email]}),
      'role': new FormControl(null, {validators: [Validators.required]}),
      'userPassword': new FormGroup({
        'password': new FormControl(null, {validators: Validators.required}),
        'confirmPassword': new FormControl(null, {validators: [Validators.required]})
      })
    });
  }

  onSignup() {
    if (this.signupForm.invalid) {
      return;
    }
    this.authService.createUser(this.signupForm);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
