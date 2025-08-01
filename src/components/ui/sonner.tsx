import { Toaster as Sonner } from "sonner";

/**
 * A wrapper component for the 'sonner' library's Toaster.
 * This refactors the original TypeScript code to JavaScript.
 *
 * It assumes a 'light' theme is used, as the 'useTheme' hook from
 * 'next-themes' has been removed for this standalone component.
 */
const Toaster = ({ ...props }) => {
  // The 'useTheme' hook was removed. A default theme is set here.
  const theme = "light";

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

// To use the 'toast' function from 'sonner' for showing notifications,
// you would import it directly in your application:
// import { toast } from "sonner";
