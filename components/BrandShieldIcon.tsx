'use client';

const defaultClass = 'block h-[1em] w-[1em] max-h-none max-w-none shrink-0';
const DEFAULT_STROKE = '#cc6119';

export interface BrandShieldIconProps {
  className?: string;
  title?: string;
  /** When set, shield outline uses this colour instead of the default. */
  strokeColor?: string;
  /** Optional soft fill on the shield body (ProtocolIcon rebuild-the-man uses this). */
  softFill?: string;
}

/** Tactical shield mark — master shield body + cross. */
export default function BrandShieldIcon({
  className,
  title,
  strokeColor,
  softFill,
}: BrandShieldIconProps) {
  const decorative = title === '';
  const label = decorative ? undefined : (title ?? 'The Rebuild Protocol');
  const stroke = strokeColor ?? DEFAULT_STROKE;
  const svgClass = className ? `${defaultClass} ${className}` : defaultClass;

  return (
    <svg
      className={svgClass}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
      role={decorative ? 'presentation' : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={label}
    >
      {label ? <title>{label}</title> : null}
      <path
        d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z"
        fill={softFill ?? stroke}
        fillOpacity={softFill ? 1 : 0.12}
      />
      <path d="M12 8v6M9 11h6" />
    </svg>
  );
}
