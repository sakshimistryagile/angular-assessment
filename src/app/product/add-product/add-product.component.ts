import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginAction } from '../../store/actions/login.action';
import { postReducer } from '../../store/reducers/product.reducer';
import { postAction } from '../../store/actions/product.action';
import { AddProduct } from '../../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  constructor(
    private store: Store<{ posts: any }>,
    private router: Router,
  ) {}
  addProduct!: FormGroup;
  ngOnInit(): void {
    this.addProduct = new FormGroup({
      productName: new FormControl('', [Validators.required]),
      productDescription: new FormControl('', [Validators.required]),
      productPoints: new FormControl('', [Validators.required]),
    });
  }
  onAddProductSubmit() {
    const product: AddProduct = {
      productName: this.addProduct.value.productName,
      productDescription: this.addProduct.value.productDescription,
      productPoints: +this.addProduct.value.productPoints,
      productImages: [], // add this as an empty array or provide appropriate data
    };
    this.store.dispatch(postAction.addProduct({ payload: product }));
    this.router.navigate(['/posts']);
  }
}
