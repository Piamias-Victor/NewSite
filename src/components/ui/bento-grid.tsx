import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./button";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  className,
  title,
  description,
  header,
  icon,
  href,
  cta,
  ctaLabel,
}: {
  className?: string;
  title?: string | ReactNode;
  description?: string | ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
  href?: string;
  cta?: ReactNode;
  ctaLabel?: string;
}) => {
  // Mouse tracking removed as per design updates


  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento shadow-sm dark:shadow-none p-4 md:p-4 border border-neutral-200 dark:border-white/10 justify-between flex flex-col space-y-4 overflow-hidden relative",
        className
      )}
    >
      {/* Glow Effect */}

      <div className="relative z-10">
         {header}
      </div>
     
      <div className="relative z-20 flex-1 flex flex-col">
        <div className="flex-1">
          {icon}
          <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2 text-sm md:text-base lg:text-lg">
            {title}
          </div>
          <div className="font-sans text-xs md:text-xs bento-text-muted leading-relaxed">
            {description}
          </div>
        </div>
        
        {cta && <div className="mt-6 pt-2">{cta}</div>}
         
        {href && (
           <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover/bento:translate-y-0 group-hover/bento:opacity-100">
             <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
               <a href={href}>
                 {ctaLabel || "En savoir plus"}
                 <ArrowRight className="ml-2 h-4 w-4" />
               </a>
             </Button>
           </div>
        )}
      </div>
      

    </div>
  );
};
