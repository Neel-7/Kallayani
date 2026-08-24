import { combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from 'src/api/apiSlice';

import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';

export const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
