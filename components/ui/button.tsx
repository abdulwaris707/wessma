import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * shadcn/ui Button — customised to the Wessmaa brand.
 * Hover language: soft lift, blue → orange transitions.
 */
const buttonVariants = cva(
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,color,box-shadow,transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-navy-800 text-white shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:bg-navy-950 hover:shadow-[var(--shadow-lift)]",
        accent:
          "bg-orange-500 text-navy-950 shadow-[var(--shadow-glow-orange)] hover:-translate-y-0.5 hover:bg-orange-400",
        outline:
          "border border-navy-800/25 bg-white text-navy-800 hover:-translate-y-0.5 hover:border-orange-500 hover:text-orange-700 hover:shadow-[var(--shadow-soft)]",
        secondary: "bg-surface-subtle text-navy-950 hover:bg-line",
        ghost: "text-navy-950 hover:bg-surface-subtle",
        link: "rounded-none px-0 text-navy-800 underline-offset-4 hover:text-orange-700 hover:underline",
        inverse:
          "bg-white text-navy-950 hover:-translate-y-0.5 hover:bg-orange-50 hover:shadow-[var(--shadow-lift)]",
        "inverse-outline":
          "border border-white/25 bg-white/5 text-white hover:-translate-y-0.5 hover:border-orange-400 hover:bg-white/10",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        default: "h-11 px-5 text-sm",
        lg: "h-13 px-7 text-[0.9375rem]",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
