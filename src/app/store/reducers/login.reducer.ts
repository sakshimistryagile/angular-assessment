import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { User } from '../../../models/user.model';
import { createReducer, on } from '@ngrx/store';
import { loginAction } from '../actions/login.action';

const initialState: User = {
  email: '',
  password: '',
};
export const loginReducer = createReducer(
  initialState,
  on(loginAction.loginSuccess, (state, action) => {
    return {
      ...state,
      user: action,
    };
  }),
);
