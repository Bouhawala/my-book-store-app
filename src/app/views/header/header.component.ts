import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RoutesPaths } from 'src/app/modules/routing/routing.type';
import { logoutAction } from 'src/app/modules/store/states/auth/auth.action';
import { selectCurrentUserProfile } from 'src/app/modules/store/states/auth/auth.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  routesPaths = RoutesPaths;
  profile$: Observable<any> = this.store.pipe(select(selectCurrentUserProfile));

  constructor(private readonly store: Store,
              private router: Router) { }

  logout() {
    this.store.dispatch(logoutAction());
  }

  viewProfile() {
    this.router.navigate(['profile']);
  }

  ngOnInit(): void {
  }

}
