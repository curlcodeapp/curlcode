'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/today', label: 'Today' },
  { href: '/products', label: 'Products' },
  { href: '/routines', label: 'Routines' },
  { href: '/recommendations', label: 'Recs' },
  { href: '/profile', label: 'Profile' },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="sticky bottom-0 flex justify-around border-t border-zinc-200 bg-white py-2"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={`flex min-w-16 flex-col items-center rounded-lg px-2 py-1 text-xs font-medium ${
              isActive ? 'text-violet-600' : 'text-zinc-500'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
