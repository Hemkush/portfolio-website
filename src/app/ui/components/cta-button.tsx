import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/app/lib/utils';

const ctaButtonVariants = cva(
  'inline-flex items-center justify-center rounded-sm font-bold uppercase tracking-[0.12em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-cyan-400 text-slate-950 hover:bg-cyan-300',
        secondary: 'border border-white/30 text-slate-200 hover:border-white/50 hover:text-white',
        tertiary: 'border border-white/15 text-slate-400 hover:border-white/30 hover:text-slate-200',
      },
      size: {
        sm: 'px-4 py-2 text-[10px]',
        md: 'px-5 py-2.5 text-[11px]',
        lg: 'px-8 py-3 text-[11px]',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

type CtaButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof ctaButtonVariants> & {
    asChild?: boolean;
  };

export const CtaButton = React.forwardRef<HTMLButtonElement, CtaButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp ref={ref} className={cn(ctaButtonVariants({ variant, size, fullWidth, className }))} {...props} />;
  }
);

CtaButton.displayName = 'CtaButton';

