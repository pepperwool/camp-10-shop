import { Product, Sport } from "../types/products"
import React from "react"
import {
  GiBasketballBall,
  GiTennisBall,
  GiRunningShoe,
  GiAmericanFootballBall,
  GiSportMedal,
} from "react-icons/gi"
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
    <div>
      <h3>{product.name}</h3>
      {React.cloneElement(sportIcon[product.sport].icon, {
        className: cn("w-6 h-6", sportIcon[product.sport].color),
      })}
      <p>{product.description}</p>
      <img src={product.image} alt={product.name} />
      <span>{product.category}</span>

      <span>{product.price}</span>
    </div>
  )
}
