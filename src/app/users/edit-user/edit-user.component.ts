import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {tap} from "rxjs/operators";
import {setSelectedUserIdAction} from "../../modules/store/states/user/user.action";
import {ActivatedRoute} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../types/user.type";
import {selectedUserSelector} from "../../modules/store/states/user/user.selector";
import {selectedBookTitleBySelectedUser} from "../../modules/store/states/book/book.selector";
import {updateUserEffectAction} from "../../modules/store/effects/user.effects";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  firstname = "";
  lastname = "";
  isDeleting = false;
  listOfBooksId: string[] = [];
  selectedIndex: number | string | undefined;
  _user = this.store.pipe(select(selectedUserSelector));
  user: Observable<User | undefined> = this.store.pipe(select(selectedUserSelector));
  userBooksTitles: Observable<string[]> = this.store.pipe(
    select(selectedBookTitleBySelectedUser)
  );


  updateUserForm: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    listOfBooksId: new FormControl([Validators.required])
  });


  routerIdTriggerSubscription: Subscription | undefined;
  routerIdTrigger: Observable<any> = this.activatedRoute.params.pipe(tap(params => this.store.dispatch(setSelectedUserIdAction({id: params.id}))));

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly store: Store) {
    this.selectedIndex = undefined;
  }

  ngOnInit(): void {
    this.routerIdTriggerSubscription = this.routerIdTrigger.subscribe();
  }

  updateUser(user: User, index: number | string | undefined): void {
    user.id = index;
    this.store.dispatch(updateUserEffectAction({user}));
    this.selectedIndex = undefined;
  }

}
