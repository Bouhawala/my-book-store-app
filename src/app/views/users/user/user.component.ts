import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {tap} from "rxjs/operators";
import { User } from 'src/app/types/user.type';
import { selectedUserSelector } from 'src/app/modules/store/states/user/user.selector';
import { selectedBookTitleBySelectedUser } from 'src/app/modules/store/states/book/book.selector';
import { setSelectedUserIdAction } from 'src/app/modules/store/states/user/user.action';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  user: Observable<User | undefined> = this.store.pipe(select(selectedUserSelector));
  userBooksTitles: Observable<string[]> = this.store.pipe(
    select(selectedBookTitleBySelectedUser)
  );

  routerIdTriggerSubscription: Subscription | undefined;
  routerIdTrigger: Observable<any> = this.activatedRoute.params.pipe(tap(params => this.store.dispatch(setSelectedUserIdAction({id: params.id}))));


  constructor(private readonly store: Store, private readonly activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.user.subscribe(res => console.log(res))
    this.routerIdTriggerSubscription = this.routerIdTrigger.subscribe();
  }

  ngOnDestroy(): void {
    this.routerIdTriggerSubscription?.unsubscribe();
  }


}
