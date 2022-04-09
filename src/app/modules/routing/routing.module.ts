import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from 'src/app/views/books/books.component';
import { EditUserComponent } from 'src/app/views/users/edit-user/edit-user.component';
import { UserComponent } from 'src/app/views/users/user/user.component';
import { UsersComponent } from 'src/app/views/users/users.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users'
  },
  {
    path: 'books',
    component: BooksComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'user/:id',
    component: UserComponent
  },
  {
    path: 'edit/:id',
    component: EditUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
