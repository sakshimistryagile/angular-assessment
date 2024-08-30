import { createReducer, on } from '@ngrx/store';
import { IUserList } from '../../../models/user.model';
import { userAction } from '../actions/user.action';

const initialState2: IUserList = {
  status: 200,
  message: '',
  data: {
    adminUserList: [],
    total_records: 1,
  },
};

export const getUserReducer = createReducer(
  initialState2,
  on(userAction.loadUsersSuccess, (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  }),
  on(userAction.addUserSuccess, (state, action) => ({
    ...state,
    data: {
      ...state.data,
      adminUserList: [...state.data.adminUserList, action.payload],
      total_records: state.data.total_records + 1,
    },
  })),
  on(userAction.editUserSuccess, (state, action) => ({
    ...state,
    data: {
      ...state.data,
      //   adminUserList: state.data.adminUserList.map(product =>
      //     product._id === action.payload._id ? action.payload as IProduct : product
      //   )
    },
  })),
);
