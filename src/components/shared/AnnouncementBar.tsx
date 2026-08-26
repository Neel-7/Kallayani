import { X } from 'lucide-react';
import { useState, type HTMLAttributes } from 'react';
import { cn } from 'src/lib/utils';

export interface AnnouncementBarProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
}

/**
 * AnnouncementBar is a premium promotional banner pinned above navigation layout headers.
 * Uses local state for ephemeral dismiss action per §12 instructions.
 */
export function AnnouncementBar({
  message = 'Enjoy complimentary express shipping on all orders over $150 • Purity, verified.',
  className,
  ...props
}: AnnouncementBarProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'w-full bg-primary-text  text-body-xs font-medium py-[8px] px-[16px] flex items-center justify-between gap-[12px] font-sans relative z-30',
        className,
      )}
      {...props}
    >
      <div className="flex-1 text-center select-none truncate text-white">
        {message}
      </div>
      <button
        onClick={() => setIsOpen(false)}
        aria-label="Dismiss Announcement"
        className="text-white/80 hover:text-white hover:bg-white/10 p-[4px] rounded-soft transition-colors shrink-0"
      >
        <X className="h-16 w-16" />
      </button>
    </div>
  );
}
