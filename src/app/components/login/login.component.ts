import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { loginAction } from '../../store/actions/login.action';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private store: Store<{ auth: any }>) {}
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('rootadmin@yopmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('123456', [Validators.required]),
    });
  }
  onLoginSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    // this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loginAction.loginStart({ email, password }));
  }
}
