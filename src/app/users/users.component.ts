import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {deleteUserEffectAction, saveNewUserAction} from '../modules/store/effects/user.effects';
import {usersSelector} from '../modules/store/states/user/user.selector';
import {User, Users} from '../types/user.type';
import {Router} from "@angular/router";
import {Books} from "../types/book.type";
import {booksSelector} from "../modules/store/states/book/book.selector";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})


export class UsersComponent implements OnInit {

  addOneUserForm: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    books: new FormControl(null)
  });

  users: Observable<Users> = this.store.pipe(select(usersSelector));
  books: Observable<Books> = this.store.pipe(select(booksSelector));


  constructor(private readonly store: Store, private router: Router) {
  }

  ngOnInit(): void {

  }


  addNewUser(user: User) {
    this.store.dispatch(saveNewUserAction({user}));
    this.addOneUserForm.reset();
  }

  selectUser(id: number | string | undefined) {
    this.router.navigate(['user', id]);
  }

  editUser(id: number | any) {
    this.router.navigate(['edit', id]);
  }

  deleteUser(id: number | any) {
    this.store.dispatch(deleteUserEffectAction({id}))

  }

}
