import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { isAuthenticated } from '../store/selectors/login.selector';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

/**
 *  Route is only open when user is authenticate or base on some condition.
 *  Check condition in if condition.
 **/
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<{ auth: any }>,
  ) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token_key = localStorage.getItem('token');
    return this.store.select(isAuthenticated).pipe(
      map((authenticate: any) => {
        if (!authenticate) {
          return this.router.createUrlTree(['login']);
        }
        return true;
      }),
    );

    // if (token_key) {
    //   const userString: any = localStorage.getItem('userData');
    //   const currentUser: any = userString ? JSON.parse(userString) : null;
    //   if (!currentUser) {
    //     this.router.navigateByUrl('/login');
    //     return false;
    //   }
    //   return currentUser;
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
  }
}
