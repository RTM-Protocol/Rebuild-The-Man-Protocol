'use client';

import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.href ? (
            <Link 
              href={item.href}
              className="text-tactical-orange hover:text-tactical-orange-bright font-bold uppercase tracking-wide transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-400 uppercase tracking-wide">
              {item.label}
            </span>
          )}
          {index < items.length - 1 && (
            <span className="text-tactical-lightgray">→</span>
          )}
        </div>
      ))}
    </nav>
  );
}



