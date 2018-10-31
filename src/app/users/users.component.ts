import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AssetElement} from '../core/assets-table/assets-table.component';
import {Subscription} from 'rxjs';
import {User} from './user.model';
import {AuthService} from '../auth/auth.service';
import {MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';

export interface UserElement {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class UsersComponent implements OnInit, OnDestroy {
  dataSource;
  columnsToDisplay = ['role', 'email', 'lastName', 'firstName', 'username'];
  expandedElement: AssetElement;
  users: User[] = [];
  usersSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getAllUsers();
    this.usersSubscription = this.authService.getUsersUpdateListener()
      .subscribe((users: User[]) => {
        this.users = users;
        this.dataSource = new MatTableDataSource(this.users);
      });
  }

  onEdit(userId: string) {
    this.router.navigate(['../../admin/signup', userId]);
  }

  onDelete(userId: string) {
    this.authService.deleteUser(userId);
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }
}
