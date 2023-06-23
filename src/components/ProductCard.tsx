import { Product, Sport } from "../types/products"
import React from "react"
import {
  GiBasketballBall,
  GiTennisBall,
  GiRunningShoe,
  GiAmericanFootballBall,
  GiSportMedal,
} from "react-icons/gi"

import { HiMinus, HiPlus } from "react-icons/hi"
import { cn } from "../lib/utils"

type Props = {
  product: Product
}

const sportIcon: Record<Sport, { icon: JSX.Element; color: string }> = {
  "american-football": {
    icon: <GiAmericanFootballBall />,
    color: "text-orange-950",
  },
  basketball: { icon: <GiBasketballBall />, color: "text-orange-600" },
  other: { icon: <GiSportMedal />, color: "text-blue-500" },
  running: { icon: <GiRunningShoe />, color: "text-purple-500" },
  tennis: { icon: <GiTennisBall />, color: "text-yellow-300" },
}

export function ProductCard({ product }: Props) {
  return (
    <div className="shadow-md rounded-md overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square object-cover object-top w-full"
        />
        <span className="absolute bottom-4 right-4 font-bold text-2xl bg-slate-900/20 aspect-square flex items-center justify-center p-2 rounded-md backdrop-blur-md text-white">
          ${product.price}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1 justify-between gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
          <div className="flex gap-2 items-center mb-3">
            {React.cloneElement(sportIcon[product.sport].icon, {
              className: cn("w-6 h-6", sportIcon[product.sport].color),
            })}
            <span className="bg-slate-300 rounded-full px-2 py-0.5 text-sm">
              {product.category}
            </span>
          </div>
          <p>{product.description}</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <HiMinus />
            </Button>
            <span className="font-medium">0</span>
            <Button variant="outline">
              <HiPlus />
            </Button>
          </div>
          <Button className="flex-1">Add to cart</Button>
        </div>
      </div>
    </div>
  )
}

type ButtonProps = {
  variant?: "primary" | "outline"
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const styles: Record<typeof variant, string> = {
    primary:
      "bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 transition",
    outline: "border-2 border-slate-400 p-2",
  }

  return (
    <button
      className={cn(
        "flex items-center justify-center rounded-md",
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
