import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';

import type { AppDispatch, RootState } from './store';

// Strictly use typed hooks instead of raw, untyped react-redux hooks across features
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
