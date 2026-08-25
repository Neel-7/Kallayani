import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { type Product } from 'src/types/product';

import { setSelectedColor, setSelectedSize } from './productSlice';

export function useVariantSelection(product: Product | undefined) {
  const dispatch = useAppDispatch();
  const selectedSize = useAppSelector((state) => state.productUi.selectedSize);
  const selectedColor = useAppSelector(
    (state) => state.productUi.selectedColor,
  );

  if (!product) {
    return {
      selectedSize,
      selectedColor,
      selectedVariant: null,
      setSize: () => {},
      setColor: () => {},
      isSingleVariant: false,
    };
  }

  const isSingleVariant = product.variants.length === 1;
  const defaultVariant = isSingleVariant ? product.variants[0] : null;

  const selectedVariant =
    defaultVariant ||
    product.variants.find((v) => {
      const matchSize = selectedSize
        ? v.size.toLowerCase() === selectedSize.toLowerCase()
        : true;
      const matchColor = selectedColor
        ? v.color.toLowerCase() === selectedColor.toLowerCase()
        : true;
      return matchSize && matchColor;
    }) ||
    null;

  const setSize = (size: string | null) => {
    dispatch(setSelectedSize(size));
  };

  const setColor = (color: string | null) => {
    dispatch(setSelectedColor(color));
  };

  return {
    selectedSize: isSingleVariant
      ? product.variants[0]?.size || 'OS'
      : selectedSize,
    selectedColor: isSingleVariant
      ? product.variants[0]?.color || ''
      : selectedColor,
    selectedVariant,
    setSize,
    setColor,
    isSingleVariant,
  };
}
