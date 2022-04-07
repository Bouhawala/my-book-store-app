import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {fetchAllBooksAction} from "./modules/store/effects/book.effects";
import {fetchAllUsersAction} from "./modules/store/effects/user.effects";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-book-store-app';

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    console.log("fff")
    this.store.dispatch(fetchAllBooksAction());
    this.store.dispatch(fetchAllUsersAction());
  }
}
