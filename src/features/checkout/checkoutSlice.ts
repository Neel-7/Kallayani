import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type CheckoutStep =
  'contact' | 'shipping' | 'delivery' | 'payment' | 'confirmation';

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  shippingMethod: string; // 'standard' | 'express'
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
}

export interface CheckoutState {
  currentStep: CheckoutStep;
  formData: CheckoutFormData;
  placedOrderNumber: string | null;
}

const initialFormData: CheckoutFormData = {
  email: '',
  firstName: '',
  lastName: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  phone: '',
  shippingMethod: 'standard', // default shipping method
  cardName: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvv: '',
};

const initialState: CheckoutState = {
  currentStep: 'contact',
  formData: initialFormData,
  placedOrderNumber: null,
};

/**
 * checkoutSlice handles checkout session state per blueprint §27.
 * Stores current step progress and in-progress guest checkout form inputs.
 */
export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<CheckoutStep>) => {
      state.currentStep = action.payload;
    },
    updateFormData: (
      state,
      action: PayloadAction<Partial<CheckoutFormData>>,
    ) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setPlacedOrder: (state, action: PayloadAction<string | null>) => {
      state.placedOrderNumber = action.payload;
    },
    resetCheckout: (state) => {
      state.currentStep = 'contact';
      state.formData = initialFormData;
      state.placedOrderNumber = null;
    },
  },
});

export const { setStep, updateFormData, setPlacedOrder, resetCheckout } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;
