import * as React from "react"

import { cn } from "@/lib/utils"

// JSDoc for Card component props
/**
 * @typedef {React.HTMLAttributes<HTMLDivElement>} CardProps
 * @property {string} [className]
 */

/**
 * A container component for grouping related content.
 * @type {React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>}
 */
const Card = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

// JSDoc for CardHeader component props
/**
 * @typedef {React.HTMLAttributes<HTMLDivElement>} CardHeaderProps
 * @property {string} [className]
 */

/**
 * A header component for a Card.
 * @type {React.ForwardRefExoticComponent<CardHeaderProps & React.RefAttributes<HTMLDivElement>>}
 */
const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

// JSDoc for CardTitle component props
/**
 * @typedef {React.HTMLAttributes<HTMLHeadingElement>} CardTitleProps
 * @property {string} [className]
 */

/**
 * A title component for a Card.
 * @type {React.ForwardRefExoticComponent<CardTitleProps & React.RefAttributes<HTMLHeadingElement>>}
 */
const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

// JSDoc for CardDescription component props
/**
 * @typedef {React.HTMLAttributes<HTMLParagraphElement>} CardDescriptionProps
 * @property {string} [className]
 */

/**
 * A description component for a Card.
 * @type {React.ForwardRefExoticComponent<CardDescriptionProps & React.RefAttributes<HTMLParagraphElement>>}
 */
const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

// JSDoc for CardContent component props
/**
 * @typedef {React.HTMLAttributes<HTMLDivElement>} CardContentProps
 * @property {string} [className]
 */

/**
 * The main content area of a Card.
 * @type {React.ForwardRefExoticComponent<CardContentProps & React.RefAttributes<HTMLDivElement>>}
 */
const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

// JSDoc for CardFooter component props
/**
 * @typedef {React.HTMLAttributes<HTMLDivElement>} CardFooterProps
 * @property {string} [className]
 */

/**
 * A footer component for a Card.
 * @type {React.ForwardRefExoticComponent<CardFooterProps & React.RefAttributes<HTMLDivElement>>}
 */
const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
