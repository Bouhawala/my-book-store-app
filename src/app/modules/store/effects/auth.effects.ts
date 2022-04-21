import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { combineLatest, of } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { AuthenticationService } from "src/app/services/auth.service";
import { checkAuthAction, loginAction, loginCompleteAction, logoutAction, logoutCompleteAction } from "../states/auth/auth.action";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthenticationService
  ) {}

  // effects go here

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginAction),
        tap(() => this.authService.login())
      ),
    { dispatch: false }
  );

  checkAuth$ = createEffect(() =>
  this.actions$.pipe(
    // If an action with the type 'checkAuth' occurs in the actions$ stream...
    ofType(checkAuthAction),
    // return an observable including the latest info from 'isLoggedIn' and 'userProfile'
    switchMap(() =>
      combineLatest([this.authService.isLoggedIn$, this.authService.user$])
    ),
    // Take it out and return the appropriate action based on if logged in or not
    switchMap(([isLoggedIn, profile]) => {
      if (isLoggedIn) {
        return of(loginCompleteAction({profile, isLoggedIn}));
      }

      return of(logoutCompleteAction());
    })
  )
);

  logout$ = createEffect(() =>
  this.actions$.pipe(
    ofType(logoutAction),
    tap(() => this.authService.logout()),
    switchMap(() => of(logoutCompleteAction()))
    )
  );
  
}