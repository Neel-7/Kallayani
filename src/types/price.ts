/**
 * Price domain type per blueprint §27.
 * Models currency amounts as whole integer cents to avoid floating-point inaccuracies.
 */
export interface Price {
  /** Amount in whole cents (e.g., 2990 represents $29.90) */
  amount: number;
  /** ISO 4217 3-letter currency code (e.g. 'USD') */
  currency: string;
}
