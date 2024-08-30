import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Grocery } from '../../../models/grocery.model';

// export const selectGroceries = (state:{groceries:Grocery[]})=>state.groceries;
export const selectGroceries = createFeatureSelector<Grocery[]>('groceries');

// Selector to filter groceries by type
export const selectGroceriesByType = (type: string) =>
  createSelector(
    selectGroceries,
    (groceries: Grocery[]) => groceries.filter((item) => item.type === type), // Use return inside filter
  );
