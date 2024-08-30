import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../../models/user.model';

export const loginAction = createActionGroup({
  source: 'Login API',
  events: {
    'Login Start': props<{ email: string; password: string }>(),
    'Login Success': props<{
      payload: {
        status: number;
        message: string;
        data: {
          _id: string;
          authToken: string;
        };
      };
    }>(),
    'Login Failure': emptyProps(),
  },
});
