import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {User} from '../users/user.model';
import {Asset} from '../assets/asset.model';
import {map} from 'rxjs/internal/operators';

const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({providedIn: 'root'})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private users: User[] = [];
  private authStatusListener = new Subject<boolean>();
  private usersUpdated = new Subject<User[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(form: FormGroup) {
    const userData = {
      username: form.value.username,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      role: form.value.role,
      password: form.value.userPassword.password
    };

    this.http.post<{message: string, user: User}>(BACKEND_URL + '/signup', userData)
      .subscribe(res => {
        this.users.push(res.user);
        this.usersUpdated.next([...this.users]);
        this.router.navigate(['../../admin/users']);
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  updateUser(form: FormGroup, userId: string) {
    const userData = {
      username: form.value.username,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      role: form.value.role,
      password: form.value.userPassword.password
    };

    this.http.put<{message: string, user: User}>(BACKEND_URL + '/' + userId, userData)
      .subscribe(result => {
        const index = this.users.findIndex(x => x._id === result.user._id);
        if (index > -1) {
          this.users[index] = result.user;
          this.usersUpdated.next([...this.users]);
          this.router.navigate(['../../admin/users']);
        }
      });
  }

  getAllUsers() {
    this.http.get<{message: string, users: User[]}>(BACKEND_URL)
      .subscribe(result => {
        this.users = result.users;
        this.usersUpdated.next([...this.users]);
      });
  }

  getUserById(userId: string) {
    return this.http.get<{message: string, user: User}>(BACKEND_URL + '/' + userId);
  }

  getUsersUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  login(username: string, password: string) {
    const authData = {email: username, password: password};
    this.http.post<{token: string, expiresIn: number, userId: string}>(BACKEND_URL + '/login', authData)
      .subscribe(response => {
        this.token = response.token;
        if (this.token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(this.token, expirationDate, this.userId);
          this.router.navigate(['/']);
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  deleteUser(userId: string) {
    this.http.delete<{message: string, userId: string}>(BACKEND_URL + '/' + userId)
      .subscribe(result => {
        const index = this.users.findIndex(x => x._id === result.userId);
        if (index > -1) {
          this.users.splice(index, 1);
          this.usersUpdated.next([...this.users]);
        }
      });
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.userId = authInfo.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }
}
