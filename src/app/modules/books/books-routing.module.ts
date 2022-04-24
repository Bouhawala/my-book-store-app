import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { RoutesPaths } from '../routing/routing.type';
import { BookComponent } from './books/book/book.component';
import { BooksComponent } from './books/books.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';

const routes: Routes = [
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
