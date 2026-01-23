// src/components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-xl",
    "text-sm font-semibold",
    "transition-all duration-300 ease-smooth",
    "focus-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        default: [
          "text-white",
          "bg-gradient-to-br from-primary via-secondary to-accent",
          "bg-[length:200%_200%]",
          "hover:bg-[position:100%_0%]",
          "shadow-lg shadow-primary/20",
          "hover:shadow-xl hover:shadow-primary/40",
          "hover:-translate-y-0.5",
          "border border-white/10",
        ],
        secondary: [
          "bg-secondary text-white",
          "hover:bg-secondary/90",
        ],
        outline: [
          "border-2 border-border bg-transparent",
          "hover:bg-muted hover:border-primary/50",
        ],
        ghost: ["bg-transparent", "hover:bg-muted"],
        glass: [
          "glass", /* Use global glass class for consistency */
          "text-foreground",
          "hover:-translate-y-0.5",
          "active:scale-[0.98]",
          /* Specific button tweaks on top of global glass */
          "bg-white/5 dark:bg-white/5",
          "hover:text-primary", /* Text turns primary on hover */
          "transition-all duration-300",
        ],
        gradient: [
          "text-white",
          "bg-gradient-to-br from-primary via-secondary to-accent",
          "bg-[length:200%_200%]",
          "hover:bg-[position:100%_0%]",
          "shadow-lg shadow-primary/20",
          "hover:shadow-xl hover:shadow-primary/40",
          "hover:-translate-y-0.5",
          "border border-white/10",
        ],
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
