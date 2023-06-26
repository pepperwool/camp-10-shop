import { Product, Sport } from "../types/products"
import React, { useState } from "react"
import {
  GiBasketballBall,
  GiTennisBall,
  GiRunningShoe,
  GiAmericanFootballBall,
  GiSportMedal,
} from "react-icons/gi"
import { BiSolidErrorCircle } from "react-icons/bi"
import { toast } from "react-hot-toast"
import { HiCheckCircle, HiMinus, HiPlus } from "react-icons/hi"
import { cn } from "../lib/utils"
import { Button } from "./Button"
import axios from "axios"
import { CartItem } from "../types/cart"
import { addToCart, updateItem } from "../api/cart"
import { useQueryClient, useMutation } from "@tanstack/react-query"

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
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: async (item: Omit<CartItem, "id">) => {
      const { data: cart } = await axios.get<CartItem[]>(
        "http://localhost:3000/cart"
      )
      // console.log(quantity)
      const cartItem = cart.find((item) => item.productId === product.id)
      if (!cartItem) {
        await addToCart(item)
        // console.log(newItem, "added new item")
      } else {
        console.log(cartItem.quantity + quantity)
        await updateItem({
          productId: cartItem.productId,
          quantity: cartItem.quantity + quantity,
          id: cartItem.id,
        })
        // console.log(updatedItem, "updated current item")
      }
    },
    onSuccess: async () => {
      // deduct the quantity from stock once it's onSuccess
      // in a real-world use case, inventory management is way more complicated
      // we only use a simplistic logic to get familiar with the concepts
      product.stock -= quantity
      await axios.patch(`http://localhost:3000/products/${product.id}`, {
        stock: product.stock,
      })
      // console.log({ productId: product.id, stock: product.stock })
      toast(`Added ${quantity} ${product.name} to your cart.`, {
        icon: <HiCheckCircle className="text-green-500" />,
      })
      setQuantity(0)
      queryClient.invalidateQueries(["cart"])
    },
    onError: () => {
      toast("Something went wrong", {
        icon: <BiSolidErrorCircle className="text-red-500" />,
      })
    },
  })

  

  async function updateCart() {
    mutate({
      productId: product.id,
      quantity,
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
