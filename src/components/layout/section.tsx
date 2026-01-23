import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ as: Component = "section", className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden py-16 md:py-24 lg:py-32",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Section.displayName = "Section";

export { Section };
