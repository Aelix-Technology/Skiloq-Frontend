import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-transparent font-sans text-sm font-semibold whitespace-nowrap transition-all duration-300 outline-none select-none cursor-pointer hover:-translate-y-0.5 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed aria-invalid:border-danger aria-invalid:ring-4 aria-invalid:ring-danger-50 dark:aria-invalid:border-danger/50 dark:aria-invalid:ring-danger/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 tracking-tight",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-primary-800 to-primary-900 text-white shadow-md shadow-primary-900/10 hover:shadow-lg hover:shadow-primary-900/20 hover:from-primary-700 hover:to-primary-800",
        accent:
          "bg-gradient-to-b from-accent-500 to-accent-600 text-white shadow-md shadow-accent-500/15 hover:shadow-lg hover:shadow-accent-500/25 hover:from-accent-400 hover:to-accent-500",
        outline:
          "border-2 border-primary-200 bg-surface text-primary-800 hover:border-accent-400 hover:bg-accent-50 hover:text-accent-700 hover:border-accent-300 shadow-xs",
        secondary:
          "bg-primary-50 text-primary-800 hover:bg-primary-100 shadow-xs",
        ghost:
          "text-primary-600 hover:bg-primary-50 hover:text-primary-900",
        success:
          "bg-gradient-to-b from-success-500 to-success-700 text-white shadow-md shadow-success-500/15 hover:shadow-lg hover:shadow-success-500/25 hover:from-success-400 hover:to-success-600",
        destructive:
          "bg-danger-50 text-danger-600 hover:bg-danger-100 border-danger-100 shadow-xs",
        link: "text-accent-600 underline-offset-4 hover:underline p-0 h-auto rounded-none",
      },
      size: {
        default:
          "h-12 px-6 py-3 text-sm",
        xs: "h-8 px-3 py-1.5 rounded-xl text-xs",
        sm: "h-10 px-4 py-2 rounded-xl text-xs",
        lg: "h-14 px-8 py-4 text-base rounded-[20px]",
        xl: "h-16 px-10 py-5 text-base rounded-[22px]",
        icon: "h-12 w-12",
        "icon-xs": "h-8 w-8 rounded-xl [&_svg:not([class*='size-'])]:size-4",
        "icon-sm": "h-10 w-10 rounded-xl [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "h-14 w-14 rounded-[18px] [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { Button, buttonVariants }
