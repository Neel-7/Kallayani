import { type Address } from './address';

/**
 * User domain type representing authenticated client profiles.
 * Purely structural stubs, no active business logic mapped in this milestone.
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  addresses: Address[];
  createdAt: string;
}
