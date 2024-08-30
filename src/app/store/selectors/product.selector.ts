import { createSelector } from '@ngrx/store';
import { IProductList } from '../../../models/product.model';

// export const selectPosts = (state:{posts:IProductList})=>state.posts;
export const selectPosts = (state: { posts: IProductList }) => state.posts;
