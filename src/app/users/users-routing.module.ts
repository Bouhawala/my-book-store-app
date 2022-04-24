import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { RoutesPaths } from '../modules/routing/routing.type';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';

const routes: Routes = [
  {
    path: RoutesPaths.USERS,
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: `${RoutesPaths.USER}/:id`,
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: `${RoutesPaths.USER}/edit/:id`,
    component: EditUserComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
