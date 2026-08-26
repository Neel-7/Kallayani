import { apiSlice } from 'src/api/apiSlice';
import { type Address } from 'src/types/address';
import { type Order } from 'src/types/order';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  sizingPreference: string;
  communicationPreference: string;
}

export const accountApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => '/account/orders',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Order' as const, id })),
              { type: 'Order', id: 'LIST' },
            ]
          : [{ type: 'Order', id: 'LIST' }],
    }),
    getOrderById: builder.query<Order, string>({
      query: (id) => `/account/orders/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Order', id }],
    }),
    getAddresses: builder.query<Address[], void>({
      query: () => '/account/addresses',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Address' as const, id })),
              { type: 'Address', id: 'LIST' },
            ]
          : [{ type: 'Address', id: 'LIST' }],
    }),
    addAddress: builder.mutation<Address, Omit<Address, 'id'>>({
      query: (body) => ({
        url: '/account/addresses',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Address', id: 'LIST' }],
    }),
    updateAddress: builder.mutation<Address, Address>({
      query: ({ id, ...body }) => ({
        url: `/account/addresses/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Address', id },
        { type: 'Address', id: 'LIST' },
      ],
    }),
    deleteAddress: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/account/addresses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Address', id },
        { type: 'Address', id: 'LIST' },
      ],
    }),
    getProfile: builder.query<UserProfile, void>({
      query: () => '/account/profile',
      providesTags: [{ type: 'User', id: 'PROFILE' }],
    }),
    updateProfile: builder.mutation<UserProfile, Partial<UserProfile>>({
      query: (body) => ({
        url: '/account/profile',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'User', id: 'PROFILE' }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useGetAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = accountApi;
