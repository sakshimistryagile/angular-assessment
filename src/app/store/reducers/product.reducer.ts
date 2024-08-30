import { createReducer, on } from '@ngrx/store';
import { IProduct, IProductList } from '../../../models/product.model';
import { getpostAction, postAction } from '../actions/product.action';
import { IUserList } from '../../../models/user.model';

const initialState: IProductList = {
  status: 200,
  message: '',
  data: {
    adminProductList: [],
    total_records: 0,
  },
};
export const postReducer = createReducer(
  initialState,
  on(postAction.loadProductsSuccess, (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  }),
  on(postAction.addProductSuccess, (state, action) => ({
    ...state,
    data: {
      ...state.data,
      adminProductList: [...state.data.adminProductList, action.payload],
      total_records: state.data.total_records + 1,
    },
  })),
  on(postAction.editProductSuccess, (state, action) => ({
    ...state,
    data: {
      ...state.data,
      adminProductList: state.data.adminProductList.map((product) =>
        product._id === action.payload._id
          ? (action.payload as IProduct)
          : product,
      ),
    },
  })),
  on(postAction.getProductSuccess, (state, action) => ({
    ...state,
    data: {
      adminProductList: [action.payload.data],
      total_records: 1,
    },
  })),
);
