import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { updateBookEffectAction } from 'src/app/modules/store/effects/book.effects';
import { selectedBookSelector } from 'src/app/modules/store/states/book/book.selector';
import { setSelectedUserIdAction } from 'src/app/modules/store/states/user/user.action';
import { Book } from 'src/app/types/book.type';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  book: Observable<Book | undefined> = this.store.pipe(select(selectedBookSelector));

  updateBookForm: FormGroup;

  routerIdTriggerSubscription: Subscription | undefined;
  routerIdTrigger: Observable<any> = this.activatedRoute.params.pipe(
      tap(params => this.store.dispatch(setSelectedUserIdAction({id: params.id}))));

      constructor(private readonly store: Store,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder) { 

this.updateBookForm = this.formBuilder.group({
title: ['', Validators.required],
authors: this.formBuilder.array([])
});
}

authors() : FormArray {
return this.updateBookForm.get("authors") as FormArray
}

newAuthor(): FormGroup {
return this.formBuilder.group({
author: ['', Validators.required]
})
}

addAuthor() {
this.authors().push(this.newAuthor());
}

removeAuthor(i: number) {
this.authors().removeAt(i);
}


  ngOnInit(): void {
    this.routerIdTriggerSubscription = this.routerIdTrigger.subscribe();
  }

  updateBook(book: Book, index: number | string | undefined): void {
    this.store.dispatch(updateBookEffectAction({book}));
    this.router.navigate(['books'])
  }

}

