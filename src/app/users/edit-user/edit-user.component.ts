import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser, IUserList, UpdateUser } from '../../../models/user.model';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUsers } from '../../store/selectors/user.selector';
import { userAction } from '../../store/actions/user.action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent {
  constructor(
    private store: Store<{ users: any }>,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  @Input() user!: IUser;
  @Output() userUpdated = new EventEmitter<UpdateUser>();
  editUser!: FormGroup;
  // prod!: IUser;
  ngOnInit(): void {
    // this.route.queryParams.subscribe((params) => {
    //   if (params['user']) {
    //     this.prod = JSON.parse(params['user']);
    //   }
    // });
    this.editUser = new FormGroup({
      userName: new FormControl(this.user.userName, [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(/^\S*$/) // No spaces allowed
      ]),
      mobileNo: new FormControl(this.user.mobileNo, [
        Validators.required,
        Validators.pattern(/^\d{10}$/) // Exactly 10 digits
      ]),
      point: new FormControl(this.user.point,[
        Validators.required,
        Validators.min(1),
        Validators.max(100)
      ]),
    });
  }
  onEditUserSubmit() {
    const updatedUser: UpdateUser = {
      userName: this.editUser.value.userName,
      mobileNo: this.editUser.value.mobileNo,
      point: +this.editUser.value.point,
      _id: this.user._id,
    };
    this.userUpdated.emit(updatedUser);
    // this.store.dispatch(userAction.editUser({ payload: product }));
    // this.router.navigate(['/users']);
  }
}
