'use client';

import type { AnchorHTMLAttributes, MouseEvent } from 'react';

export type MailtoLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
};

/**
 * Reliable mailto navigation with Next.js client-side routing: some stacks only
 * honour mailto after an explicit location.assign (and plain &lt;a&gt; can sit
 * under fixed footers). Plain modifier-clicks keep default browser behaviour.
 */
export default function MailtoLink({ href, onClick, children, ...rest }: MailtoLinkProps) {
  return (
    <a
      href={href}
      {...rest}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (!href.startsWith('mailto:')) return;

        const plainClick =
          !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && e.button === 0;
        if (!plainClick) return;

        e.preventDefault();
        window.location.assign(href);
      }}
    >
      {children}
    </a>
  );
}
