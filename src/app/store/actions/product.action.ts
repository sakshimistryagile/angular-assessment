import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import {
  AddProduct,
  AddProductRes,
  EditProduct,
  EditProductRes,
  GetProductDetails,
  IProduct,
  IProductList,
} from '../../../models/product.model';
import { IUserList } from '../../../models/user.model';

export const getpostAction = createActionGroup({
  source: 'Products API',
  events: {
    getProduct: props<{ payload: string }>(),
    getProductSuccess: props<{ payload: AddProductRes }>(),
    getProductFailure: emptyProps(),
  },
});

export const postAction = {
  loadProducts: createAction(
    '[Product] Load Products',
    props<{ page: number; limit: number; search: string }>(),
  ),
  loadProductsSuccess: createAction(
    '[Product] Load Products Success',
    props<{ payload: IProductList }>(),
  ),
  loadProductsFailure: createAction('[Product] Load Products Failure'),

  loadUsers: createAction(
    '[User] Load Users',
    props<{
      page: number;
      limit: number;
      search: string;
      column: string;
      order: string;
    }>(),
  ),
  loadUsersSuccess: createAction(
    '[User] Load Users Success',
    props<{ payload: IUserList }>(),
  ),
  loadUsersFailure: createAction('[User] Load Users Failure'),

  addProduct: createAction(
    '[Product] Add Product',
    props<{ payload: AddProduct }>(),
  ),
  addProductSuccess: createAction(
    '[Product] Add Product Success',
    props<{ payload: any }>(),
  ),
  addProductFailure: createAction('[Product] Add Product Failure'),

  editProduct: createAction(
    '[Product] Edit Product',
    props<{ payload: EditProduct }>(),
  ),
  editProductSuccess: createAction(
    '[Product] Edit Product Success',
    props<{ payload: any }>(),
  ),
  editProductFailure: createAction('[Product] Edit Product Failure'),
  getProduct: createAction(
    '[Product] Get Product',
    props<{ payload: string }>(),
  ),
  getProductSuccess: createAction(
    '[Product] Get Product Success',
    props<{ payload: any }>(),
  ),
  getProductFailure: createAction('[Product] Get Product Failure'),
};
