import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import { Router } from '@angular/router';
import { Book, Books } from 'src/app/types/book.type';
import { booksSelector } from 'src/app/modules/store/states/book/book.selector';
import { ApiService } from 'src/app/services/api.service';
import { fetchAllBooksAction, saveNewBookAction } from 'src/app/modules/store/effects/book.effects';

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
    this.store.dispatch(fetchAllBooksAction());
  }

  addNewBook(book: Book) {
    this.store.dispatch(saveNewBookAction({book}));
    this.addOneBookForm.reset();
  }


  navigateToUserPage() {
    this.router.navigateByUrl('users');
  }

}
