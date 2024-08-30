import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, EMPTY, of } from 'rxjs';
import { GroceryService } from '../../services/grocery.service';
import { groceryAction } from '../actions/grocery.action';

@Injectable()
export class GroceryEffects {
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groceryAction.loadGroceries),
      exhaustMap(() =>
        this.groceryService.fetchAllGroceries().pipe(
          map((groceries: any) =>
            groceryAction.loadGroceriesSuccess({ payload: groceries }),
          ),
          catchError(() => of(groceryAction.loadGroceriesFailure())),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private groceryService: GroceryService,
  ) {}
}
