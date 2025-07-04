import React from "react";
import { cn } from "@/lib/utils";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "body1"
  | "body2"
  | "body3"
  | "base"
  | "base-medium"
  | "base-bold"
  | "label";

interface TypographyProps {
  variant: TypographyVariant;
  children: React.ReactNode;
  className?: string;
  responsive?: boolean;
  as?: React.ElementType;
}

const getTypographyClass = (
  variant: TypographyVariant,
  responsive: boolean = false
): string => {
  const responsiveSuffix = responsive ? "-responsive" : "";

  return `typography-${variant}${responsiveSuffix}`;
};

const getDefaultElement = (variant: TypographyVariant): React.ElementType => {
  switch (variant) {
    case "h1":
      return "h1";
    case "h2":
      return "h2";
    case "h3":
      return "h3";
    case "h4":
      return "h4";
    case "h5":
      return "h5";
    case "label":
      return "label";
    default:
      return "p";
  }
};

export const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  className,
  responsive = false,
  as,
}) => {
  const Component = as || getDefaultElement(variant);
  const typographyClass = getTypographyClass(variant, responsive);

  return React.createElement(
    Component,
    { className: cn(typographyClass, className) },
    children
  );
};

// Convenience components for common use cases
export const H1: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h1" {...props} />
);

export const H2: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h2" {...props} />
);

export const H3: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h3" {...props} />
);

export const H4: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h4" {...props} />
);

export const H5: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h5" {...props} />
);

export const Body1: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="body1" {...props} />
);

export const Body2: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="body2" {...props} />
);

export const Body3: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="body3" {...props} />
);

export const BaseText: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="base" {...props} />
);

export const MediumText: React.FC<Omit<TypographyProps, "variant">> = (
  props
) => <Typography variant="base-medium" {...props} />;

export const BoldText: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="base-bold" {...props} />
);

export const Label: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="label" {...props} />
);

// Usage examples:
/*
// Basic usage
<Typography variant="h1">Heading Text</Typography>

// Responsive typography (automatically switches between desktop/mobile sizes)
<Typography variant="h1" responsive>Responsive Heading</Typography>

// Using convenience components
<H1 responsive>Main Heading</H1>
<Body1 responsive>Body text content</Body1>

// Custom HTML element
<Typography variant="h2" as="div">Heading as div</Typography>

// With additional styling
<Typography variant="body1" className="text-blue-600 mb-4">
  Styled body text
</Typography>
*/
