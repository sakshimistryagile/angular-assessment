import { createAction, props } from '@ngrx/store';
import {
  IProductList,
  AddProduct,
  EditProduct,
} from '../../../models/product.model';
import { AddUser, IUserList, UpdateUser } from '../../../models/user.model';

export const userAction = {
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

  addUser: createAction('[User] Add User', props<{ payload: AddUser }>()),
  addUserSuccess: createAction(
    '[User] Add User Success',
    props<{ payload: any }>(),
  ),
  addUserFailure: createAction('[User] Add User Failure'),

  editUser: createAction('[User] Edit User', props<{ payload: UpdateUser }>()),
  editUserSuccess: createAction(
    '[User] Edit User Success',
    props<{ payload: any }>(),
  ),
  editUserFailure: createAction('[User] Edit User Failure'),
};
