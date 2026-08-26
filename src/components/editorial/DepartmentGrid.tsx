import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from 'src/lib/utils';

export interface DepartmentTile {
  title: string;
  image: string;
  href: string;
  tagline: string;
}

export type DepartmentGridProps = React.HTMLAttributes<HTMLDivElement>;

const departments: DepartmentTile[] = [
  {
    title: 'Women',
    tagline: 'Hand-woven heritage, modern lines',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
    href: '/women',
  },
  {
    title: 'Jewelry',
    tagline: 'Sterling accents, sculptural legacy',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
    href: '/jewelry',
  },
  {
    title: 'Home',
    tagline: 'Artisanal objects, curated comfort',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80',
    href: '/home',
  },
];

/**
 * DepartmentGrid presents the three primary departments with equal visual weight per §12.
 * Responsive design: On mobile, collapses to a horizontal swipeable slider; on desktop, renders as a 3-column grid.
 */
export function DepartmentGrid({ className, ...props }: DepartmentGridProps) {
  return (
    <div
      className={cn(
        'w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-[16px] -mx-[24px] px-[24px] pb-[8px] md:pb-0 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-[24px] font-sans',
        className
      )}
      {...props}
    >
      {departments.map((dept) => (
        <Link
          key={dept.title}
          to={dept.href}
          className="group relative flex-1 min-w-[280px] md:min-w-0 aspect-[4/5] md:aspect-[3/4] rounded-soft overflow-hidden snap-center bg-muted-surface border border-border/20 shadow-sm"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={dept.image}
              alt={dept.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
            />
            {/* Elegant luxury overlay shading */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          </div>

          {/* Text Overlays */}
          <div className="absolute inset-0 p-[24px] md:p-[32px] flex flex-col justify-end text-white space-y-[4px]">
            <h3 className="text-heading-sm font-bold tracking-tight">
              {dept.title}
            </h3>
            <p className="text-body-xs text-white/80 line-clamp-2 leading-relaxed">
              {dept.tagline}
            </p>
            <div className="pt-[8px] flex items-center gap-[4px] text-body-xs font-semibold uppercase tracking-wider text-white/95">
              Explore <span className="transition-transform group-hover:translate-x-[3px]">→</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
