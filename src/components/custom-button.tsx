import React, { ReactElement, Ref, forwardRef } from "react";
import Link, { LinkProps } from "next/link";
import { cn } from "@/lib/utils";

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode | string;
  variant?: "primary" | "secondary";
  className?: string;
  hasShadow?: boolean;
  fullWidth?: boolean;
  roundedFull?: boolean;
  isLoading?: boolean;
  iconClassName?: string;
  icon?: ReactElement;
}

//User must pass in at least one children or one icon or both but cannot miss both
type RequireProperty<T, Prop extends keyof T> = T & { [key in Prop]-?: T[key] };
type RequireChildrenOrIcon =
  | (RequireProperty<CustomButtonProps, "children"> & RequireLinkProp)
  | (RequireProperty<CustomButtonProps, "icon"> & RequireLinkProp);

type RequireLinkProp =
  | { as: "link"; href: LinkProps["href"] }
  | { as?: "button"; href?: null };

const variantClassname = {
  primary: "bg-tertiary text-white ",
  secondary: "bg-white text-tertiary border border-tertiary ",
};

export const CustomButton = forwardRef(
  (
    {
      as = "button",
      children,
      variant = "primary",
      className,
      hasShadow = false,
      icon,
      href,
      fullWidth,
      iconClassName = "",
      roundedFull,
      isLoading = false,
      disabled = false, // add disabled prop
      ...props
    }: RequireChildrenOrIcon,
    ref?: Ref<HTMLButtonElement>,
  ) => {
    const mergedIconClassName = cn(
      "sm:h-6 h-5 w-5 sm:w-6",
      children ? "mr-[0.625rem]" : "",
      iconClassName,
    );

    const componentClassname = cn(
      // Base styles
      "inline-flex min-w-[3rem] sm:min-w-[3.5rem] items-center gap-2 justify-center font-medium transition-transform duration-75 active:scale-95",

      // Height variations
      variant === "primary" && hasShadow
        ? "sm:h-[calc(3.5rem-4px)] h-[calc(3rem-4px)] pt-[4px]"
        : "sm:h-12 h-10",

      variantClassname[variant],

      fullWidth && "w-full",
      hasShadow && "shadow-inner",
      roundedFull ? "rounded-full" : "rounded-[8px]",
      icon && "gap-4",
      disabled && "opacity-50 cursor-not-allowed",

      className,
    );

    if (as === "link") {
      return (
        <Link href={href ?? ""} className={componentClassname}>
          {icon
            ? React.cloneElement(icon, {
                className: mergedIconClassName,
              } as React.HTMLProps<HTMLElement>)
            : null}
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={componentClassname}
        {...props}
        disabled={isLoading || disabled}
      >
        {isLoading && (
          <svg
            className={cn("text-white h-5 w-5 animate-spin")}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        <>
          {icon
            ? React.cloneElement(icon, {
                className: mergedIconClassName,
              } as React.HTMLProps<HTMLElement>)
            : null}
          {children}
        </>
      </button>
    );
  },
);

CustomButton.displayName = "CustomButton";
