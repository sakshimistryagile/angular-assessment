import { createAction, props } from '@ngrx/store';
import { Grocery } from '../../../models/grocery.model';
import { Bucket } from '../../../models/bucket.model';

export const addToBucket = createAction(
  '[Bucket] Add',
  props<{ payload: Bucket }>(),
);
export const removeFromoBucket = createAction(
  '[Bucket] Remove',
  props<{ payload: Partial<Bucket> }>(),
);
