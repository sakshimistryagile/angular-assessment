import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  AddProduct,
  EditProduct,
  IProduct,
  IProductList,
} from '../../../models/product.model';
import { postAction } from '../../store/actions/product.action';
import { selectPosts } from '../../store/selectors/product.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent {
  constructor(
    private store: Store<{ posts: any }>,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  posts$?: Observable<IProductList>;
  editProduct!: FormGroup;
  product_id: string = '';
  products?: IProduct;
  ngOnInit(): void {
    this.posts$ = this.store.select(selectPosts);
    this.product_id = this.route.snapshot.paramMap.get('id') ?? '';
    this.store.dispatch(postAction.getProduct({ payload: this.product_id }));
    this.posts$.subscribe((product) => {
      this.products = product.data.adminProductList[0];
    });

    this.editProduct = new FormGroup({
      productName: new FormControl(this.products?.productName, [
        Validators.required,
      ]),
      productDescription: new FormControl(this.products?.productDescription, [
        Validators.required,
      ]),
      productPoints: new FormControl(this.products?.productPoints, [
        Validators.required,
      ]),
    });
  }
  onEditProductSubmit() {
    const product: EditProduct = {
      productName: this.editProduct.value.productName,
      productDescription: this.editProduct.value.productDescription,
      productPoints: +this.editProduct.value.productPoints,
      productImages: [],
      _id: this.product_id,
      removeImages: [],
      productStatus: true,
    };
    this.store.dispatch(postAction.editProduct({ payload: product }));
    this.router.navigate(['/posts']);
  }
}
