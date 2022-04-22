import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit, ɵdetectChanges as detectChanges, ɵmarkDirty as markDirty } from '@angular/core';
import { fetchAllUsersAction } from "./modules/store/effects/user.effects";
import { select, Store } from "@ngrx/store";
import { fetchAllBooksAction } from "./modules/store/effects/book.effects";
import { Observable } from 'rxjs';
import { selectCurrentUserProfile, selectIsLoggedIn } from './modules/store/states/auth/auth.selector';
import { checkAuthAction, loginAction, logoutAction } from './modules/store/states/auth/auth.action';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit{
  title = 'my-book-store-app';

  loggedIn$: Observable<boolean> = this.store.pipe(select(selectIsLoggedIn));
  profile$: Observable<any> = this.store.pipe(select(selectCurrentUserProfile));

  options: AnimationOptions = {
    path: '/assets/animation.json',
  };

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '500px',
    margin: '0 auto',
  };

  onLoopCompleteCalledTimes = 0;

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  
  onLoopComplete(): void {
    // * first option via `NgZone.run()`
    this.ngZone.run(() => {
      this.onLoopCompleteCalledTimes++;
    });

    // * second option via `ChangeDetectorRef.detectChanges()`
    this.onLoopCompleteCalledTimes++;
    this.ref.detectChanges();
    // Angular 9+
    detectChanges(this);

    // * third option via `ChangeDetectorRef.markForCheck()`
    this.onLoopCompleteCalledTimes++;
    this.ref.markForCheck();
    // Angular 9+
    markDirty(this);
  }

  constructor(private readonly store: Store,
              private ngZone: NgZone,
              private ref: ChangeDetectorRef) {
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
