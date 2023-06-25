import React, { useState } from "react";
import { Button } from "./Button";
import { HiCheckCircle, HiMinus, HiPlus } from "react-icons/hi";
import { BiSolidErrorCircle } from "react-icons/bi";
import { Product, Sport } from "../types/products";
import { cn } from "../lib/utils";
import {
  GiAmericanFootballBall,
  GiBasketballBall,
  GiRunningShoe,
  GiSportMedal,
  GiTennisBall,
} from "react-icons/gi";
import { addToCart, getCart, updateQuantity } from "../api/cart";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  product: Product;
};

type MutationData = {
  quantity: number;
  productId: number;
};

const sportIcon: Record<Sport, { icon: JSX.Element; color: string }> = {
  "american-football": {
    icon: <GiAmericanFootballBall />,
    color: "text-orange-950",
  },
  basketball: { icon: <GiBasketballBall />, color: "text-orange-600" },
  other: { icon: <GiSportMedal />, color: "text-blue-500" },
  running: { icon: <GiRunningShoe />, color: "text-purple-500" },
  tennis: { icon: <GiTennisBall />, color: "text-yellow-300" },
};

export function ProductCard({ product }: Props) {
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(0);

  const { mutate } = useMutation(
    async (data: MutationData) => {
      const cart = await getCart();
      const cartItem = cart.find((item) => item.productId === product.id);

      if (!cartItem) {
        return await addToCart({
          productId: product.id,
          quantity: data.quantity,
        });
      }

      return await updateQuantity({
        productId: product.id,
        quantity: data.quantity + cartItem.quantity,
        id: cartItem.id,
      });
    },
    {
      onSuccess: () => {
        setQuantity(0);
        toast("Product added to cart", {
          icon: <HiCheckCircle className="w-6 h-6 text-green-500" />,
          position: "bottom-right",
        });
        //
        queryClient.invalidateQueries(["cart"]);
      },
      onError: () => {
        toast("Something went wrong", {
          icon: <BiSolidErrorCircle className="w-6 h-6 text-red-500" />,
          position: "bottom-right",
        });
      },
    }
  );

  function decrementHandler() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  function incrementHandler() {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  }

  async function addToCartHandler() {
    mutate({ quantity, productId: product.id });
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
            <Button onClick={decrementHandler} variant="outline">
              <HiMinus />
            </Button>
            <span className="font-medium w-6 text-center">{quantity}</span>
            <Button onClick={incrementHandler} variant="outline">
              <HiPlus />
            </Button>
          </div>
          <Button
            onClick={addToCartHandler}
            className="flex-1"
            disabled={quantity === 0}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
