import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Observable, of} from 'rxjs';
import {Book, Books} from '../types/book.type';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {booksSelector} from '../modules/store/states/book/book.selector';
import {fetchAllBooksAction, saveNewBookAction} from '../modules/store/effects/book.effects';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  addOneBookForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required])
  });

  books: Observable<Books> = this.store.pipe(select(booksSelector));

  constructor(private readonly apiService: ApiService, private readonly store: Store, private router:Router) {
  }

  ngOnInit(): void {
  }

  addNewBook(book: Book) {
    this.store.dispatch(saveNewBookAction({book}));
    this.addOneBookForm.reset();
  }


  navigateToUserPage() {
    this.router.navigateByUrl('users');
  }

}
