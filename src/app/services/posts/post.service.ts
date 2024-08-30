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
import { IUserList } from '../../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = `https://node-product-distribution-backend.agiletechnologies.in`;

  constructor(private http: HttpClient) {}
  token = localStorage.getItem('token');
  parsedToken = this.token ? JSON.parse(this.token) : null;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.parsedToken}`, // Use your JWT token key here
  });
  fetchAllPosts(payload: any): Observable<IProductList> {
    return this.http.post<IProductList>(
      `${this.baseUrl}/admin/product/list`,
      payload,
      { headers: this.headers },
    );
    // return this.http.post<IProductList>(`${this.baseUrl}/admin/product/list`, payload);
  }
  addProduct(payload: AddProduct) {
    return this.http.post<AddProductRes>(
      `${this.baseUrl}/admin/product/create`,
      payload,
      { headers: this.headers },
    );
  }
  editProduct(payload: EditProduct) {
    return this.http.post<EditProductRes>(
      `${this.baseUrl}/admin/product/update`,
      payload,
      { headers: this.headers },
    );
  }
  getProductDetails(payload: string) {
    return this.http.get<AddProductRes>(
      `${this.baseUrl}/admin/product/get/${payload}`,
      { headers: this.headers },
    );
  }
  fetchAllUsers(payload: any): Observable<IUserList> {
    return this.http.post<IUserList>(
      `${this.baseUrl}/admin/user/list`,
      payload,
      { headers: this.headers },
    );
    // return this.http.post<IProductList>(`${this.baseUrl}/admin/product/list`, payload);
  }
}
