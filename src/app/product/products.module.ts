import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../interceptor/jwt.interceptor';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../guard/auth-guard';
import { PostComponent } from './product/post.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { UserListComponent } from '../users/user-list/user-list.component';
import { ProductListComponent } from './product-list/product-list.component';
const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ProductListComponent },
      {
        path: 'add-post',
        canActivate: [AuthGuardService],
        component: PostComponent,
      },
      {
        path: 'add-product',
        canActivate: [AuthGuardService],
        component: AddProductComponent,
      },
      {
        path: 'edit-product/:id',
        canActivate: [AuthGuardService],
        component: EditProductComponent,
      },
      {
        path: 'user-list',
        canActivate: [AuthGuardService],
        component: UserListComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatPaginatorModule,
    MatTableModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
})
export class ProductModule {}
