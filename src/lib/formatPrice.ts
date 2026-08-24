/**
 * Formats a numeric price amount into a localized currency string.
 *
 * @param amountInCents - The currency amount in whole cents to avoid floating-point inaccuracies (e.g. 2990 represents $29.90).
 * @param currency - The 3-letter ISO 4217 currency code (defaults to "USD").
 * @returns A beautifully formatted currency string (e.g. "$29.90").
 */
export function formatPrice(
  amountInCents: number,
  currency: string = 'USD',
): string {
  const amountInDollars = amountInCents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amountInDollars);
}
