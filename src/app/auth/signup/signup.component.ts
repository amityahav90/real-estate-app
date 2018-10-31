import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {User} from '../../users/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  isLoading = false;
  userId: string;
  mode = 'create';
  user: User;
  private authStatusSub: Subscription;

  constructor(private authService: AuthService, private route: ActivatedRoute) {}

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

    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        if (paramMap.has('id')) {
          this.mode = 'edit';
          this.userId = paramMap.get('id');
          this.authService.getUserById(this.userId)
            .subscribe(userData => {
              this.user = userData.user;
              this.signupForm.setValue({
                username: this.user.username,
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                email: this.user.email,
                role: this.user.role,
                userPassword: {
                  password: null,
                  confirmPassword: null
                }
              });
            });
        } else {
          this.mode = 'create';
          this.userId = null;
        }
      });
  }

  onSignup() {
    if (this.signupForm.invalid) {
      return;
    }

    if (this.mode === 'create') {
      this.authService.createUser(this.signupForm);
    } else if (this.mode === 'edit') {
      this.authService.updateUser(this.signupForm, this.userId);
    }
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
