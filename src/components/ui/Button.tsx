import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "onDarkOutline";

const variants: Record<Variant, string> = {
  primary:
    "bg-terra text-white hover:bg-[#a56146] shadow-[0_1px_0_rgba(0,0,0,0.06)]",
  secondary:
    "bg-lake text-ivory hover:bg-lake-deep",
  ghost:
    "bg-transparent text-charcoal border border-charcoal/20 hover:border-charcoal/45 hover:bg-white/50",
  onDark:
    "bg-terra text-white hover:bg-[#c87d5c]",
  onDarkOutline:
    "bg-transparent text-ivory border border-ivory/45 hover:bg-ivory/10 hover:border-ivory/80",
};

type Common = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
};

type ButtonAsButton = Common &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = Common & { href: string; external?: boolean };

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 focus-ring rounded-sm",
    variants[variant],
    className,
  );

  if ("href" in props && props.href) {
    const { href, external, ...rest } = props as ButtonAsLink;
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
