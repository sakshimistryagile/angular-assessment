import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { exhaustMap, map, catchError, of, tap } from 'rxjs';
import { GroceryService } from '../../services/grocery.service';
import { groceryAction } from '../actions/grocery.action';
import { LoginService } from '../../services/login/login.service';
import { loginAction } from '../actions/login.action';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffects {
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction.loginStart),
      exhaustMap((action) =>
        this.loginService.login(action.email, action.password).pipe(
          map((response) => {
            this.loginService.setUserInLocalStorage(response);
            return loginAction.loginSuccess({ payload: response });
          }),
          catchError(() => of(loginAction.loginFailure())),
        ),
      ),
    ),
  );
  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginAction.loginSuccess]),
        tap((action) => {
          //   this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.payload.data) {
            this.router.navigate(['/']);
          }
        }),
      );
    },
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router,
  ) {}
}
