"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { handleAnchorClick } from "@/lib/anchor";

type Variant = "primary" | "secondary";
type Size = "md" | "sm";

const base =
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-sm font-medium leading-none transition-colors duration-[180ms] ease-state select-none disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-signal text-white hover:bg-signal-deep",
  secondary:
    "border border-hairline bg-surface text-fg hover:border-hairline-strong hover:bg-surface-2",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-[22px] text-[1.0625rem]",
  sm: "h-11 px-4 text-[0.9375rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type LinkProps = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className"> & { href: string };

type ButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className"> & { href?: undefined };

export function Button(props: LinkProps | ButtonProps) {
  const { variant = "primary", size = "md", className = "", ...rest } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (rest.href !== undefined) {
    const { onClick, href, ...linkRest } = rest as LinkProps;
    const click = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) handleAnchorClick(e, href);
    };
    return <Link {...linkRest} href={href} onClick={click} className={classes} />;
  }

  const { type = "button", ...buttonRest } = rest as ButtonProps;
  return <button type={type} {...buttonRest} className={classes} />;
}
