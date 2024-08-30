import { Routes } from '@angular/router';
import { AuthGuardService } from './guard/auth-guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./product/products.module').then((m) => m.ProductModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
    canActivate: [AuthGuardService],
  },
];
