import {HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {exhaustMap, take} from 'rxjs/operators';
import { AuthService } from './views/auth/auth.service';
import { TokenStorageService } from './views/auth/token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
              private tokenStorageService: TokenStorageService) {  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return  this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.tokenStorageService.getToken())});
        return next.handle(authReq);
      }));

      }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
