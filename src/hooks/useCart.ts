import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { CartItem } from "../types/cart"
import { getCart } from "../api/cart"

export const useCart = (options?: UseQueryOptions<CartItem[], Error>) =>
  useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    ...options,
  })
