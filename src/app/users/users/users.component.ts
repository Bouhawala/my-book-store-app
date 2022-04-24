import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { User, Users } from 'src/app/types/user.type';
import { usersSelector } from 'src/app/modules/store/states/user/user.selector';
import { booksSelector } from 'src/app/modules/store/states/book/book.selector';
import { Book, Books } from 'src/app/types/book.type';
import { saveNewUserAction } from 'src/app/modules/store/effects/user.effects';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})

export class UsersComponent implements OnInit {

  addOneUserForm: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    listOfBooksId: new FormControl(null)
  });

  users: Observable<Users> = this.store.pipe(select(usersSelector));
  books: Observable<Books> = this.store.pipe(select(booksSelector));

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void { }
  
  addNewUser(user: User) {
    this.store.dispatch(saveNewUserAction({user}));
    this.addOneUserForm.reset();
  }


  trackByBook(index: number, book: Book): number | string {
    return book.id;
  }

}
