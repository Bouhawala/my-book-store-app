import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgrxStoreModule } from './modules/store/store.module';
import { RoutingModule } from './modules/routing/routing.module';
import { HeaderComponent } from './views/header/header.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { AuthModule } from '@auth0/auth0-angular';
import { LottieCacheModule, LottieModule } from 'ngx-lottie';
import { ProfileComponent } from './views/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    ProfileComponent,
    ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    NgrxStoreModule,
    AuthModule.forRoot({
      domain: 'dev-uylded-v.us.auth0.com',
      clientId: 'Fyl64Ko9eWxHQpkbpY3ZqrN824Jr5Zi9',
      redirectUri: window.location.origin,
    }),
    LottieModule.forRoot({ player: playerFactory }),
    LottieCacheModule.forRoot(),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}