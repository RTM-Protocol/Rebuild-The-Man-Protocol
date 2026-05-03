'use client';

const defaultClass = 'block h-[1em] w-[1em] max-h-none max-w-none shrink-0';

export interface BrandShieldIconProps {
  className?: string;
  title?: string;
  /** When set, shield outline uses this colour instead of `currentColor`. */
  strokeColor?: string;
  /** Optional soft disc behind the outline (same treatment as protocol glyphs). */
  softFill?: string;
}

/** Tactical shield mark — line weight matches protocol glyphs (1.5 / 24 viewBox). */
export default function BrandShieldIcon({
  className,
  title,
  strokeColor,
  softFill,
}: BrandShieldIconProps) {
  const decorative = title === '';
  const label = decorative ? undefined : (title ?? 'The Rebuild Protocol');
  const stroke = strokeColor ?? 'currentColor';
  const svgClass = className ? `${defaultClass} ${className}` : defaultClass;
  return (
    <svg
      className={svgClass}
      viewBox="0 0 24 24"
      fill="none"
      role={decorative ? 'presentation' : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={label}
    >
      {label ? <title>{label}</title> : null}
      {softFill ? <circle cx={12} cy={12} r={10.5} fill={softFill} /> : null}
      <path
        d="M6.5 5.5H17.5L19.25 8v5L12 20.25 4.75 13V8L6.5 5.5z"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
