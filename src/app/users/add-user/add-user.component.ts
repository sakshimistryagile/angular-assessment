import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddProduct } from '../../../models/product.model';
import { postAction } from '../../store/actions/product.action';
import { AddUser } from '../../../models/user.model';
import { userAction } from '../../store/actions/user.action';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  constructor(
    private store: Store<{ users: any }>,
    private router: Router,
  ) {}
  addUser!: FormGroup;
  ngOnInit(): void {
    this.addUser = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(/^\S*$/) // No spaces allowed
      ]),
      mobileNo: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/) // Exactly 10 digits
      ]),
      point: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(100)
      ]),
    });
  }
  onaddUserSubmit() {
    const user: AddUser = {
      userName: this.addUser.value.userName,
      mobileNo: this.addUser.value.mobileNo,
      point: +this.addUser.value.point,
    };
    this.store.dispatch(userAction.addUser({ payload: user }));
    this.router.navigate(['/users']);
  }
}
