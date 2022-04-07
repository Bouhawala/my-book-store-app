import {Component, OnInit} from '@angular/core';
import {fetchAllUsersAction} from "./modules/store/effects/user.effects";
import {Store} from "@ngrx/store";
import {fetchAllBooksAction} from "./modules/store/effects/book.effects";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'training-library-manager';

  constructor(private readonly store: Store) {
  }
  ngOnInit(): void {
    this.store.dispatch(fetchAllBooksAction());
    this.store.dispatch(fetchAllUsersAction());
  }
}
