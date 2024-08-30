import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  IProduct,
  IProductList,
  IProductListReq,
} from '../../../models/product.model';
import { debounceTime, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPosts } from '../../store/selectors/product.selector';
import { postReducer } from '../../store/reducers/product.reducer';
import { postAction } from '../../store/actions/product.action';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormField,
  MatFormFieldControl,
  MatLabel,
} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  posts$?: Observable<IProductList>;
  args: IProductListReq = {
    page: 1,
    limit: 10,
    search: '',
  };
  pageSize = this.args.limit;
  Math: any;
  searchControl = new FormControl('');
  constructor(
    private store: Store<{ posts: IProductList }>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(postAction.loadProducts(this.args));
    this.posts$ = this.store.select(selectPosts);

    // Handle search input changes
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((search) => {
        this.args.search = search ?? ''; //
        this.args.page = 1; // Reset to first page on new search
        this.store.dispatch(postAction.loadProducts(this.args));
      });
  }
  addProduct(event: any) {
    this.router.navigate(['/products/add-product']);
  }
  editProduct(prod: IProduct) {
    this.router.navigate([`/products/edit-product/${prod._id}`]);
  }
  onPageChange(event: any): void {
    this.args.page = event.pageIndex + 1; // Angular Material uses zero-based index
    this.args.limit = event.pageSize; // Update the limit based on the selected page size
    this.pageSize = event.pageSize; // Update the page size property
    this.store.dispatch(postAction.loadProducts(this.args)); // Dispatch the action with updated args
  }
}
