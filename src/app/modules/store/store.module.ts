import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {bookReducer} from './states/book/book.reducer';
import {BookEffects} from './effects/book.effects';
import {UserEffects} from './effects/user.effects';
import {userReducer} from './states/user/user.reducer';

export enum StoreEntity {
  BOOK = 'book',
  USER = 'user'
}

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({
      [StoreEntity.BOOK]: bookReducer,
      [StoreEntity.USER]: userReducer
    }),
    EffectsModule.forRoot([
      BookEffects,
      UserEffects
    ]),
    StoreDevtoolsModule.instrument()
  ]
})
export class NgrxStoreModule {
}
