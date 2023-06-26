import { Product, Sport } from "../types/products"
import React, { useState } from "react"
import {
  GiBasketballBall,
  GiTennisBall,
  GiRunningShoe,
  GiAmericanFootballBall,
  GiSportMedal,
} from "react-icons/gi"
import { toast } from "react-hot-toast"
import { HiCheckCircle, HiMinus, HiPlus } from "react-icons/hi"
import { cn } from "../lib/utils"
import { Button } from "./Button"
import axios from "axios"
import { CartItem } from "../types/cart"
import { addToCart, updateItem } from "../api/cart"

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

type Props = {
  product: Product
}

export function ProductCard({ product }: Props) {
  const [quantity, setQuantity] = useState(0)

  function increment() {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  function decrement() {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  async function updateCart() {
    const { data: cart } = await axios.get<CartItem[]>(
      "http://localhost:3000/cart"
    )
    console.log(quantity)
    const cartItem = cart.find((item) => item.productId === product.id)
    let item = {
      productId: product.id,
      quantity,
    }
    if (!cartItem) {
      const newItem = await addToCart(item)
      console.log(newItem, "added new item")
    } else {
      console.log(cartItem.quantity + quantity)
      const updatedItem = await updateItem({
        productId: cartItem.productId,
        quantity: cartItem.quantity + quantity,
        id: cartItem.id,
      })
      console.log(updatedItem, "updated current item")
    }

    await axios.patch(`http://localhost:3000/products/${product.id}`, {
      stock: product.stock - quantity,
    })

    setQuantity(0)
    toast("Product added to cart", {
      icon: <HiCheckCircle className="w-6 h-6 text-green-500" />,
      position: "bottom-right",
    })
  }

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
            <span className="bg-slate-200 rounded-full px-2 py-0.5 text-sm">
              {product.category}
            </span>
          </div>
          <p>{product.description}</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <Button onClick={decrement} variant="outline">
              <HiMinus />
            </Button>
            <span className="font-medium w-6 text-center">{quantity}</span>
            <Button onClick={increment} variant="outline">
              <HiPlus />
            </Button>
          </div>
          <Button
            onClick={updateCart}
            className="flex-1"
            disabled={quantity === 0}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  )
}
