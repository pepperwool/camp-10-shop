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
import { MutatedCartItem } from "../types/cart"
import { CardBadge } from "./CardBadge"
import { updateProductStock } from "../api/products"

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

  // hint: this can be wrapped into a custom hook useCartMutation () => useMutation ... 
  const { mutate } = useMutation({
    mutationFn: async (item: MutatedCartItem) => {
      const { data: cart } = await axios.get<CartItem[]>(
        "http://localhost:3000/cart"
      )
      // console.log(quantity)
      const cartItem = cart.find((item) => item.productId === product.id)
      if (!cartItem) {
        return await addToCart(item)
        // console.log(newItem, "added new item")
      } else {
        console.log(cartItem.quantity + quantity)
        return await updateItem({
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
      // for example, it might be better to mutate cart and products in a separate useMutate function
      // we only use a simpler logic here to get familiar with the concepts
      await updateProductStock({
        id: product.id,
        stock: product.stock - quantity
      })
      toast(`Added ${quantity} ${product.name} to your cart.`, {
        icon: <HiCheckCircle className="text-green-500" />,
      })
      setQuantity(0)
      queryClient.invalidateQueries(["cart"])
      queryClient.invalidateQueries(["products"])
    },
    onError: () => {
      toast("Something went wrong", {
        icon: <BiSolidErrorCircle className="text-red-500" />,
      })
    },
  })

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
    mutate({
      productId: product.id,
      quantity,
    })
  }

  return (
    <div className="shadow-md rounded-md overflow-hidden flex flex-col bg-slate-100">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square object-cover object-top w-full"
        />
        { (product.stock <= 3 && product.stock > 0) && <CardBadge stock={product.stock}/> }
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
            variant={product.stock === 0 ? "destructive" : "primary"}
            onClick={updateCart}
            className="flex-1"
            disabled={quantity === 0}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to cart"}
          </Button>
        </div>
      </div>
    </div>
  )
}
