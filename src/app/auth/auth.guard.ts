import { map, take } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate() {
    return this.authService.user.pipe(
      //we don't want out guard to keep listening to user. We just want to look at
      //the user value once.
      //"take(1)" operator takes the user value once and unsubscribe later.
      take(1),
      map((user) => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
