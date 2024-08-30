import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../../models/user.model';
interface LoginResponse {
  status: number;
  message: string;
  data: {
    _id: string;
    authToken: string;
  };
}
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  private baseUrl = `https://node-product-distribution-backend.agiletechnologies.in`;
  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/admin/login`, {
      email,
      password,
    });
  }
  setUserInLocalStorage(user: any) {
    localStorage.setItem('token', JSON.stringify(user.data.authToken));
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
