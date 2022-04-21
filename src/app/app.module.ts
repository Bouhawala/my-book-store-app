import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgrxStoreModule } from './modules/store/store.module';
import { RoutingModule } from './modules/routing/routing.module';
import { UsersComponent } from './views/users/users.component';
import { BooksComponent } from './views/books/books.component';
import { UserComponent } from './views/users/user/user.component';
import { EditUserComponent } from './views/users/edit-user/edit-user.component';
import { HeaderComponent } from './views/header/header.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    BooksComponent,
    UserComponent,
    EditUserComponent,
    HeaderComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgrxStoreModule,
    AuthModule.forRoot({
      domain: 'dev-uylded-v.us.auth0.com',
      clientId: 'Fyl64Ko9eWxHQpkbpY3ZqrN824Jr5Zi9',
      redirectUri: window.location.origin,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
