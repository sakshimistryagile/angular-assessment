import { IUserList } from '../../../models/user.model';

export const selectUsers = (state: { users: IUserList }) => state.users;
