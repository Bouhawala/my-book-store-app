import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Book, Books } from 'src/app/types/book.type';
import { booksSelector } from 'src/app/modules/store/states/book/book.selector';
import { deleteBookEffectAction, saveNewBookAction } from 'src/app/modules/store/effects/book.effects';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  

  addOneBookForm: FormGroup; 

 /* = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required])
  });
  */

  books: Observable<Books> = this.store.pipe(select(booksSelector));

  constructor(private readonly store: Store,
              private router:Router,
              private formBuilder: FormBuilder) { 
    
    this.addOneBookForm = this.formBuilder.group({
      title: ['', Validators.required],
      authors: this.formBuilder.array([])
    });
  }

  authors() : FormArray {
    return this.addOneBookForm.get("authors") as FormArray
  }

  newAuthor(): FormGroup {
    return this.formBuilder.group({
      author: ['', Validators.required]
    })
  }

  addAuthor() {
    this.authors().push(this.newAuthor());
  }

  removeAuthor(i: number) {
    this.authors().removeAt(i);
  }

  ngOnInit(): void {  }

  addNewBook(book: Book) {
    this.store.dispatch(saveNewBookAction({book}));
    this.addOneBookForm.reset();
  }

}
