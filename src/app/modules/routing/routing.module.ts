import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from 'src/app/views/books/books.component';
import { EditUserComponent } from 'src/app/views/users/edit-user/edit-user.component';
import { UserComponent } from 'src/app/views/users/user/user.component';
import { UsersComponent } from 'src/app/views/users/users.component';
import {AuthGuard} from '@auth0/auth0-angular';
import { RoutesPaths } from './routing.type';
import { AppComponent } from 'src/app/app.component';
import { ProfileComponent } from 'src/app/views/profile/profile.component';
import { BookComponent } from 'src/app/views/books/book/book.component';
import { EditBookComponent } from 'src/app/views/books/edit-book/edit-book.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: RoutesPaths.BOOKS,
    component: BooksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: `${RoutesPaths.BOOK}/:id`,
    component: BookComponent,
    canActivate: [AuthGuard]
  },
  {
    path: `${RoutesPaths.BOOK}/edit/:id`,
    component: EditBookComponent,
    canActivate: [AuthGuard]
  },
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
  {
    path: RoutesPaths.PROFILE,
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }
