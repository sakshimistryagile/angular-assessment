import {
  ApplicationConfig,
  provideZoneChangeDetection,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { groceryReducer } from './store/reducers/grocery.reducer';
import { bucketReducer } from './store/reducers/bucket.reducer';
import { GroceryEffects } from './store/effects/grocery.effect';
import { loginReducer } from './store/reducers/login.reducer';
import { LoginEffects } from './store/effects/login.effects';
import { postReducer } from './store/reducers/product.reducer';
import { PostsEffects } from './store/effects/product.effect';
import { httpInterceptorProviders } from './interceptor/provide';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { getUserReducer } from './store/reducers/user.reducer';
import { UserEffects } from './store/effects/user.effects';
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      groceries: groceryReducer,
      myBucket: bucketReducer,
      auth: loginReducer,
      posts: postReducer,
      users: getUserReducer,
    }),
    provideEffects([GroceryEffects, LoginEffects, PostsEffects, UserEffects]),
    provideStoreDevtools({}),
    httpInterceptorProviders,
    provideAnimationsAsync(),
  ],
};
