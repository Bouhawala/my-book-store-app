import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { RoutesPaths } from './routing.type';
import { ProfileComponent } from 'src/app/views/profile/profile.component';

const routes: Routes = [
  {
    path: 'my-users',
    loadChildren: () => import('../users/users.module')
    .then(module => module.UsersModule)
  },
  {
    path: 'my-books',
    loadChildren: () => import('../books/books.module')
    .then(module => module.BooksModule)
  },
  {
    path: RoutesPaths.PROFILE,
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'my-users/users',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }
