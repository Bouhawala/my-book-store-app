import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCurrentUserProfile } from 'src/app/modules/store/states/auth/auth.selector';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile$: Observable<any> = this.store.pipe(select(selectCurrentUserProfile));

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
  }

}
