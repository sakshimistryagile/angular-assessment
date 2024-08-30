import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AddProduct,
  AddProductRes,
  EditProduct,
  EditProductRes,
  IProductList,
} from '../../../models/product.model';
import { AddUser, IUserList, UpdateUser } from '../../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `https://node-product-distribution-backend.agiletechnologies.in`;

  constructor(private http: HttpClient) {}
  token = localStorage.getItem('token');
  parsedToken = this.token ? JSON.parse(this.token) : null;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.parsedToken}`, // Use your JWT token key here
  });

  addUser(payload: AddUser) {
    return this.http.post<any>(`${this.baseUrl}/admin/user/create`, payload, {
      headers: this.headers,
    });
  }
  editUser(payload: UpdateUser) {
    return this.http.post<any>(`${this.baseUrl}/admin/user/update`, payload, {
      headers: this.headers,
    });
  }
  getUserDetails(payload: string) {
    return this.http.get<AddProductRes>(
      `${this.baseUrl}/admin/user/get/${payload}`,
      { headers: this.headers },
    );
  }
  fetchAllUsers(payload: any): Observable<IUserList> {
    return this.http.post<IUserList>(
      `${this.baseUrl}/admin/user/list`,
      payload,
      { headers: this.headers },
    );
  }
}
