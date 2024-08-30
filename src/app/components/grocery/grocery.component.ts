import { Component, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Grocery } from '../../../models/grocery.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  addToBucket,
  removeFromoBucket,
} from '../../store/actions/bucket.action';
import {
  selectGroceries,
  selectGroceriesByType,
} from '../../store/selectors/grocery.selector';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-grocery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grocery.component.html',
  styleUrl: './grocery.component.css',
})
export class GroceryComponent {
  groceries$?: Observable<Grocery[]>;
  filteredGroceries$?: Observable<Grocery[]>;

  constructor(private store: Store<{ groceries: Grocery[] }>) {
    this.groceries$ = store.select(selectGroceries);
  }

  onTypeChange(event: Event) {
    const selectedType = (event.target as HTMLSelectElement).value;

    if (selectedType) {
      this.filteredGroceries$ = this.store.select(
        selectGroceriesByType(selectedType),
      );
    } else {
      this.filteredGroceries$ = undefined;
    }
  }
  trackByGroceryId(index: number, grocery: Grocery): number {
    return grocery.id; // or another unique identifier
  }

  increment(item: Grocery) {
    const payload = {
      id: item.id,
      name: item.name,
      quantity: 1,
    };
    this.store.dispatch(addToBucket({ payload: payload }));
  }
  decrement(item: Grocery) {
    const payload = {
      id: item.id,
      name: item.name,
    };
    this.store.dispatch(removeFromoBucket({ payload: payload }));
  }
}
