import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { setSelectedBookIdAction } from 'src/app/modules/store/states/book/book.action';
import { selectedBookSelector } from 'src/app/modules/store/states/book/book.selector';
import { Book } from 'src/app/types/book.type';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy {

  book: Observable<Book | undefined> = this.store.pipe(select(selectedBookSelector));

  routerIdTriggerSubscription: Subscription | undefined;
  routerIdTrigger: Observable<any> = this.activatedRoute.params.pipe(
    tap(params => this.store.dispatch(setSelectedBookIdAction({id: +params.id}))));

  constructor(private readonly store: Store,
              private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routerIdTriggerSubscription = this.routerIdTrigger.subscribe();
  }

  ngOnDestroy(): void {
    this.routerIdTriggerSubscription?.unsubscribe();
  }

}
