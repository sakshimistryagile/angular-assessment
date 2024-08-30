import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { exhaustMap, map, catchError, of } from 'rxjs';
import { PostService } from '../../services/posts/post.service';
import { userAction } from '../actions/user.action';
import { UserService } from '../../services/users/user.service';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userAction.loadUsers),
      exhaustMap((action) =>
        this.userService
          .fetchAllUsers({
            limit: action.limit,
            page: action.page,
            search: action.search,
            column: action.column,
            order: action.order,
          })
          .pipe(
            map((posts) => userAction.loadUsersSuccess({ payload: posts })),
            catchError(() => of(userAction.loadUsersFailure())),
          ),
      ),
    ),
  );
  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userAction.addUser),
      exhaustMap((action) =>
        this.userService.addUser(action.payload).pipe(
          map((product) =>
            userAction.addUserSuccess({ payload: product.data }),
          ),
          catchError(() => of(userAction.addUserFailure())),
        ),
      ),
    ),
  );

  editProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userAction.editUser),
      exhaustMap((action) =>
        this.userService.editUser(action.payload).pipe(
          map((product) =>
            userAction.editUserSuccess({ payload: product.data }),
          ),
          catchError(() => of(userAction.editUserFailure())),
        ),
      ),
    ),
  );
  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}
}
