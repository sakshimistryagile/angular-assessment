import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, EMPTY, of, tap } from 'rxjs';
import { GroceryService } from '../../services/grocery.service';
import { groceryAction } from '../actions/grocery.action';
import { getpostAction, postAction } from '../actions/product.action';
import { PostService } from '../../services/posts/post.service';
import { userAction } from '../actions/user.action';

@Injectable()
export class PostsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postAction.loadProducts),
      exhaustMap((action) =>
        this.postService
          .fetchAllPosts({
            limit: action.limit,
            page: action.page,
            search: action.search,
          })
          .pipe(
            map((posts) => postAction.loadProductsSuccess({ payload: posts })),
            catchError(() => of(postAction.loadProductsFailure())),
          ),
      ),
    ),
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postAction.addProduct),
      exhaustMap((action) =>
        this.postService.addProduct(action.payload).pipe(
          map((product) =>
            postAction.addProductSuccess({ payload: product.data }),
          ),
          catchError(() => of(postAction.addProductFailure())),
        ),
      ),
    ),
  );

  editProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postAction.editProduct),
      exhaustMap((action) =>
        this.postService.editProduct(action.payload).pipe(
          map((product) =>
            postAction.editProductSuccess({ payload: product.data }),
          ),
          catchError(() => of(postAction.editProductFailure())),
        ),
      ),
    ),
  );
  // getProduct$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(getpostAction.getProduct),
  //     exhaustMap((action) =>
  //       this.postService.getProductDetails(action.payload).pipe(
  //         map((product) =>
  //           getpostAction.getProductSuccess({ payload: product })
  //         ),
  //         catchError(() => of(getpostAction.getProductFailure()))
  //       )
  //     )
  //   )
  // );
  getProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postAction.getProduct),
      exhaustMap((action) =>
        this.postService.getProductDetails(action.payload).pipe(
          map((product) => postAction.getProductSuccess({ payload: product })),
          catchError((error) => {
            return of(postAction.getProductFailure());
          }),
        ),
      ),
    ),
  );
  // loadUsers$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(userAction.loadUsers),
  //     exhaustMap((action) =>
  //       this.postService
  //         .fetchAllUsers({
  //           limit: action.limit,
  //           page: action.page,
  //           search: action.search,
  //           column: action.column,
  //           order: action.order,
  //         })
  //         .pipe(
  //           map((posts) => userAction.loadUsersSuccess({ payload: posts })),
  //           catchError(() => of(userAction.loadUsersFailure()))
  //         )
  //     )
  // //   )
  // );

  constructor(
    private actions$: Actions,
    private postService: PostService,
  ) {}
}
