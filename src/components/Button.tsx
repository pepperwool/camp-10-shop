import { cn } from "../lib/utils"

type ButtonProps = {
  variant?: "primary" | "outline" | "destructive" | "ghost"
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export function Button({
  variant = "primary",
  className,
  children = "Button",
  ...props
}: ButtonProps) {
  const styles: Record<typeof variant, string> = {
    primary: "bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600",
    outline: "border-2 border-slate-400 p-2",
    destructive: "bg-red-500 px-4 py-2 text-white hover:bg-red-600",
    ghost: "bg-transparent px-4 py-2 text-black hover:bg-indigo-50",
  }

  return (
    <button
      className={cn(
        "flex items-center justify-center rounded-md select-none transition disabled:opacity-40 disabled:pointer-events-none",
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
