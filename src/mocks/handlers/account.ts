import { http, HttpResponse } from 'msw';
import { type Address } from 'src/types/address';
import { type Order } from 'src/types/order';
import { type Product } from 'src/types/product';

import womenClothing from '../data/women-clothing.json';

const product1 = womenClothing[0] as unknown as Product;
const product2 = womenClothing[1] as unknown as Product;
const product3 = womenClothing[2] as unknown as Product;

// In-memory state for mock account data
let mockProfile = {
  id: 'user_001',
  email: 'patricia@example.com',
  firstName: 'Patricia',
  lastName: 'Hale',
  sizingPreference: 'M',
  communicationPreference: 'email',
};

let mockAddresses: Address[] = [
  {
    id: 'addr_001',
    firstName: 'Patricia',
    lastName: 'Hale',
    addressLine1: '456 Artisanal Parkway',
    addressLine2: 'Suite 100',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94103',
    country: 'United States',
    phone: '415-555-0199',
  },
  {
    id: 'addr_002',
    firstName: 'Patricia',
    lastName: 'Hale',
    addressLine1: '789 Heritage Road',
    city: 'New York',
    state: 'NY',
    postalCode: '10012',
    country: 'United States',
    phone: '212-555-0143',
  },
  {
    id: 'addr_003',
    firstName: 'Patricia',
    lastName: 'Hale',
    addressLine1: '101 Corporate Boulevard',
    addressLine2: 'Suite 500',
    city: 'Austin',
    state: 'TX',
    postalCode: '78701',
    country: 'United States',
    phone: '512-555-0811',
  },
];

const mockOrders: Order[] = [
  {
    id: 'ORD-2026-88402',
    items: [
      {
        id: `${product1.id}-${product1.variants[0]!.id}`,
        product: product1,
        selectedVariant: product1.variants[0]!,
        quantity: 1,
      },
    ],
    subtotal: { amount: 18500, currency: 'USD' },
    tax: { amount: 1480, currency: 'USD' },
    shipping: { amount: 0, currency: 'USD' },
    total: { amount: 19980, currency: 'USD' },
    status: 'delivered',
    shippingAddress: mockAddresses[0]!,
    billingAddress: mockAddresses[0]!,
    createdAt: '2026-08-10T14:30:00.000Z',
  },
  {
    id: 'ORD-2026-99381',
    items: [
      {
        id: `${product2.id}-${product2.variants[0]!.id}`,
        product: product2,
        selectedVariant: product2.variants[0]!,
        quantity: 1,
      },
    ],
    subtotal: { amount: 42000, currency: 'USD' },
    tax: { amount: 3360, currency: 'USD' },
    shipping: { amount: 1500, currency: 'USD' },
    total: { amount: 46860, currency: 'USD' },
    status: 'processing',
    shippingAddress: mockAddresses[1]!,
    billingAddress: mockAddresses[1]!,
    createdAt: '2026-08-25T09:15:00.000Z',
  },
  {
    id: 'ORD-2026-77312',
    items: [
      {
        id: `${product3.id}-${product3.variants[0]!.id}`,
        product: product3,
        selectedVariant: product3.variants[0]!,
        quantity: 1,
      },
    ],
    subtotal: { amount: 8900, currency: 'USD' },
    tax: { amount: 712, currency: 'USD' },
    shipping: { amount: 1000, currency: 'USD' },
    total: { amount: 10612, currency: 'USD' },
    status: 'shipped',
    shippingAddress: mockAddresses[2]!,
    billingAddress: mockAddresses[2]!,
    createdAt: '2026-08-26T10:00:00.000Z',
  },
];

export const accountHandlers = [
  // 1. Get profile
  http.get('*/account/profile', () => {
    return HttpResponse.json(mockProfile);
  }),

  // 2. Update profile
  http.put('*/account/profile', async ({ request }) => {
    const body = (await request.json()) as Partial<typeof mockProfile>;
    mockProfile = {
      ...mockProfile,
      ...body,
    };
    return HttpResponse.json(mockProfile);
  }),

  // 3. Get addresses
  http.get('*/account/addresses', () => {
    return HttpResponse.json(mockAddresses);
  }),

  // 4. Add address
  http.post('*/account/addresses', async ({ request }) => {
    const body = (await request.json()) as Omit<Address, 'id'>;
    const newAddress: Address = {
      id: `addr_${Math.floor(100 + Math.random() * 900)}`,
      ...body,
    };
    mockAddresses.push(newAddress);
    return HttpResponse.json(newAddress);
  }),

  // 5. Update address
  http.put('*/account/addresses/:id', async ({ request, params }) => {
    const { id } = params;
    const body = (await request.json()) as Partial<Address>;
    const index = mockAddresses.findIndex((addr) => addr.id === id);

    if (index === -1) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Address Not Found',
      });
    }

    mockAddresses[index] = {
      ...mockAddresses[index],
      ...body,
      id: id as string, // keep the same ID
    } as Address;

    return HttpResponse.json(mockAddresses[index]);
  }),

  // 6. Delete address
  http.delete('*/account/addresses/:id', ({ params }) => {
    const { id } = params;
    const initialLength = mockAddresses.length;
    mockAddresses = mockAddresses.filter((addr) => addr.id !== id);

    if (mockAddresses.length === initialLength) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Address Not Found',
      });
    }

    return HttpResponse.json({ success: true });
  }),

  // 7. Get orders
  http.get('*/account/orders', () => {
    return HttpResponse.json(mockOrders);
  }),

  // 8. Get order by ID
  http.get('*/account/orders/:id', ({ params }) => {
    const { id } = params;
    const order = mockOrders.find((ord) => ord.id === id);

    if (!order) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Order Not Found',
      });
    }

    return HttpResponse.json(order);
  }),
];
