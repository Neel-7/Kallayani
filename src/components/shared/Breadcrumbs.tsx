import * as React from 'react';
import { cn } from 'src/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps extends React.HtmlHTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumbs is a semantic navigability trail matching accessibility standard guidelines.
 * Last item is non-interactive representing the active current page (aria-current="page").
 *
 * NOTE: The raw anchor tags (<a>) are used temporarily. These should be refactored
 * to React Router <Link> components once real routing is introduced.
 */
export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, items, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn('text-caption text-muted-foreground', className)}
        {...props}
      >
        <ol className="flex flex-wrap items-center gap-[8px] font-mono">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={item.label} className="flex items-center gap-[8px]">
                {index > 0 && (
                  <span aria-hidden="true" className="text-muted-foreground/50">
                    /
                  </span>
                )}

                {isLast || !item.href ? (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className={cn(
                      'font-normal',
                      isLast && 'text-foreground font-semibold',
                    )}
                  >
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    className="hover:text-primary transition-colors hover:underline"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Breadcrumbs.displayName = 'Breadcrumbs';
