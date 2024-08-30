import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BucketComponent } from './components/bucket/bucket.component';
import { GroceryComponent } from './components/grocery/grocery.component';
import { Store } from '@ngrx/store';
import { Grocery } from '../models/grocery.model';
import { groceryAction } from './store/actions/grocery.action';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BucketComponent,
    GroceryComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LoginComponent,
    HeaderComponent,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private store: Store<{ myBucket: Grocery[] }>) {}
  ngOnInit() {
    this.store.dispatch(groceryAction.loadGroceries());
  }
}
