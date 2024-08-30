import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isAuthenticated } from '../../store/selectors/login.selector';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isAuthenticat?: Observable<boolean>;
  constructor(private store: Store<{ auth: any }>) {
    this.store.select(isAuthenticated);
  }

  ngOnInit(): void {
    this.isAuthenticat = this.store.select(isAuthenticated);
  }
  onLogout(event: Event) {
    event.preventDefault();
    // this.store.dispatch(autoLogout());
  }
}
