import { combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from 'src/api/apiSlice';
import cartReducer from 'src/features/cart/cartSlice';
import catalogReducer from 'src/features/catalog/catalogSlice';
import checkoutReducer from 'src/features/checkout/checkoutSlice';
import productUiReducer from 'src/features/product/productSlice';
import searchReducer from 'src/features/search/searchSlice';
import wishlistReducer from 'src/features/wishlist/wishlistSlice';

import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';

export const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  catalog: catalogReducer,
  productUi: productUiReducer,
  wishlist: wishlistReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  search: searchReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
