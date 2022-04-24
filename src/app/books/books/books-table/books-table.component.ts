import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteBookEffectAction } from 'src/app/modules/store/effects/book.effects';
import { Book, Books } from 'src/app/types/book.type';

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksTableComponent implements OnInit {

  @Input() books: Books | null = null;

  constructor(private readonly store: Store,
              private router: Router) { }

  ngOnInit(): void {
  }

  selectBook(id: number | string) {
    this.router.navigate(['my-books/book', id]);
  }

  editBook(id: number | any) {
    this.router.navigate(['my-books/book/edit', id]);
  }

  deleteBook(id: number | any) {
    this.store.dispatch(deleteBookEffectAction({id}));
    this.router.navigate(['my-books/books']);
  }

  trackByBook(index: number, book: Book): number | string {
    return book.id;
  }

  getAuthorName(authorName: any): string {
    return authorName.author;
  }

}
