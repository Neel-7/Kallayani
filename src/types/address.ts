/**
 * Address domain type representing billing and shipping destinations.
 * Purely structural stubs, no active business logic mapped in this milestone.
 */
export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}
