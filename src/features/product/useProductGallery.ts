import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { setActiveImageIndex } from './productSlice';

export function useProductGallery() {
  const dispatch = useAppDispatch();
  const activeIndex = useAppSelector(
    (state) => state.productUi.activeImageIndex,
  );

  const setIndex = (index: number) => {
    dispatch(setActiveImageIndex(index));
  };

  return {
    activeIndex,
    setIndex,
  };
}
