import { cn } from "../lib/utils"

type ButtonProps = {
  variant?: "primary" | "outline"
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const styles: Record<typeof variant, string> = {
    primary:
      "bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 transition disabled:opacity-40 disabled:pointer-events-none",
    outline: "border-2 border-slate-400 p-2",
  }

  return (
    <button
      className={cn(
        "flex items-center justify-center rounded-md select-none",
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
