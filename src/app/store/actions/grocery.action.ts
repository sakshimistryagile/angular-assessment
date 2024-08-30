import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Grocery } from '../../../models/grocery.model';

// export const initGrocery = createAction(
//     '[Grocery] Load Groceries'
// // )
// export const loadGrocerySuccess = createAction(
//     '[Grocery] Load Groceries Success'
// )

export const groceryAction = createActionGroup({
  source: 'Grocery API',
  events: {
    'Load Groceries': emptyProps(),
    'Load Groceries Success': props<{ payload: Grocery[] }>(),
    'Load Groceries Failure': emptyProps(),
  },
});
