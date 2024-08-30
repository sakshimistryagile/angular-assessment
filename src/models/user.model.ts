export interface User {
  email: string;
  password: string;
}
export interface IUserList {
  status: number;
  message: string;
  data: {
    adminUserList: IUser[];
    total_records: number;
  };
}
export interface IUser {
  _id: string;
  depot: string;
  userName: string;
  mobileNo: string;
  point: number;
  createdDate: string;
  updatedDate: string;
  __v: number;
  convertedForSort: string;
}
export interface IUserListReq {
  limit: number;
  page: number;
  search: string;
  column: string;
  order: string;
}
export interface AddUser {
  userName: string;
  mobileNo: string;
  point: number;
}
export interface UpdateUser {
  userName: string;
  mobileNo: string;
  point: number;
  _id: string;
}
