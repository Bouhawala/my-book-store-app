import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { UsersComponent } from './users/users.component';
import { BooksComponent } from './books/books.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgrxStoreModule} from './modules/store/store.module';
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    BooksComponent,
    UserComponent,
    EditUserComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgrxStoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }