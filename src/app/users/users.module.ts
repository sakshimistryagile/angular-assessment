import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../guard/auth-guard';
import { JwtInterceptor } from '../interceptor/jwt.interceptor';
import { PostComponent } from '../product/product/post.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: UserListComponent },

      {
        path: 'add-user',
        canActivate: [AuthGuardService],
        component: AddUserComponent,
      },
      {
        path: 'edit-user',
        canActivate: [AuthGuardService],
        component: EditUserComponent,
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
export class UsersModule {}
