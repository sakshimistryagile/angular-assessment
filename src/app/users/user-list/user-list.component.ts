import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { IUser, IUserList, IUserListReq, UpdateUser } from '../../../models/user.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { debounceTime, Observable, Subscription } from 'rxjs';
import { postAction } from '../../store/actions/product.action';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { selectUsers } from '../../store/selectors/user.selector';
import { EditUserComponent } from "../edit-user/edit-user.component";
import { userAction } from '../../store/actions/user.action';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSortModule,
    MatInputModule,
    EditUserComponent
],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users$?: Observable<IUserList>;
  selectedUser!: IUser;
  modelShow!:boolean; 
  args: IUserListReq = {
    page: 1,
    limit: 10,
    search: '',
    column: '',
    order: '',
  };
  currentItem = 'Television';
  pageSize = this.args.limit;
  searchControl = new FormControl('');
  dataSource$ = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    '_id',
    'depot',
    'userName',
    'mobileNo',
    'point',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store: Store<{ users: IUserList }>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(postAction.loadUsers(this.args));
    this.users$ = this.store.select(selectUsers);
    this.users$.subscribe((users) => {
      this.dataSource$.data = users.data.adminUserList || [];
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((search) => {
        this.args.search = search ?? '';
        this.args.page = 1; // Reset to first page on new search
        this.store.dispatch(postAction.loadUsers(this.args));
      });
  }

  addUser(event: any) {
    this.router.navigate(['/users/add-user']);
  }

  editUser(user: IUser) {
    // this.router.navigate([`/users/edit-user/${prod._id}`]);
    // this.router.navigate(['/users/edit-user'], {
    //   queryParams: { user: JSON.stringify(user) },
    // });
    this.modelShow = true;
    this.selectedUser = user;
  }
  onUserUpdated(updatedUser: UpdateUser) {
    // Handle the updated user here, e.g., dispatch an action to update the store
    this.store.dispatch(userAction.editUser({ payload: updatedUser }));
    this.store.dispatch(postAction.loadUsers(this.args));
    this.modelShow = false;
  }
  onPageChange(event: any): void {
    this.args.page = event.pageIndex + 1;
    this.args.limit = event.pageSize;
    this.pageSize = event.pageSize;
    this.store.dispatch(postAction.loadUsers(this.args));
  }

  onSortChange(sort: any): void {
    this.args.column = sort.active;
    this.args.order = sort.direction === 'asc' ? 'asc' : 'desc';
    this.args.page = 1;
    this.store.dispatch(postAction.loadUsers(this.args));
  }
}
