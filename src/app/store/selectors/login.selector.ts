import { createFeatureSelector, createSelector } from '@ngrx/store';
const selectAuth = (state: any) => state.auth;

export const getAuthState = createSelector(selectAuth, (state: any) => state);
// export const AUTH_STATE_NAME = 'auth';
// const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);
// export interface AuthState {
//   user: User | null;
// }

export interface User {
  payload: {
    status: number;
    message: string;
    data: {
      _id: string;
      authToken: string;
    };
  };
}
export const isAuthenticated = createSelector(getAuthState, (state) => {
  return state.user?.payload?.data ? true : false;
});

// export const getToken = createSelector(getAuthState, (state) => {
//   return state.user ? state.user.userToken : null;
// });
