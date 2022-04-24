import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { deleteUserEffectAction } from 'src/app/modules/store/effects/user.effects';
import { Users } from 'src/app/types/user.type';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersTableComponent implements OnInit {

  @Input() users: Users | null = null;

  constructor(private readonly store: Store,
    private router: Router) { }

  ngOnInit(): void {
  }

  selectUser(id: number | string) {
    this.router.navigate(['my-users/user', id]);
  }

  editUser(id: number | any) {
    this.router.navigate(['my-users/user/edit', id]);
  }

  deleteUser(id: number | any) {
    this.store.dispatch(deleteUserEffectAction({id}));
    this.router.navigate(['my-users/users']);
  }

  trackByUser(index: number, user: User): number | string {
    return user.id;
  }

}
