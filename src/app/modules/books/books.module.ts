import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './books/book/book.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { BooksTableComponent } from './books/books-table/books-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BooksComponent,
    BookComponent,
    EditBookComponent,
    BooksTableComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BooksModule { }
