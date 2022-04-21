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
import { AuthComponent } from './views/auth/auth.component';
import { MustMatchDirective } from './views/auth/must-match.directive';
import { AuthInterceptor, authInterceptorProviders } from './auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    BooksComponent,
    UserComponent,
    EditUserComponent,
    HeaderComponent,
    DropdownDirective,
    AuthComponent,
    MustMatchDirective
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgrxStoreModule
  ],
  providers: [authInterceptorProviders, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})

export class AppModule { }
