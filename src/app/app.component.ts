import { Component, OnInit } from '@angular/core';
import { fetchAllUsersAction } from "./modules/store/effects/user.effects";
import { select, Store } from "@ngrx/store";
import { fetchAllBooksAction } from "./modules/store/effects/book.effects";
import { Observable } from 'rxjs';
import { selectCurrentUserProfile, selectIsLoggedIn } from './modules/store/states/auth/auth.selector';
import { checkAuthAction, loginAction, logoutAction } from './modules/store/states/auth/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'my-book-store-app';

  loggedIn$: Observable<boolean> = this.store.pipe(select(selectIsLoggedIn));
  profile$: Observable<any> = this.store.pipe(select(selectCurrentUserProfile));

  constructor(private readonly store: Store) {
  }
  ngOnInit(): void { 
    this.store.dispatch(checkAuthAction());
    this.store.dispatch(fetchAllBooksAction());
    this.store.dispatch(fetchAllUsersAction());
  }

  logout() {
    this.store.dispatch(logoutAction());
  }

  login() {
    this.store.dispatch(loginAction());
  }
}
