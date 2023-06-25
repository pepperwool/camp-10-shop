import { useQuery } from "@tanstack/react-query";
import { CartItem } from "../types/cart";
import { getCart } from "../api/cart";
import { UseQueryOptions } from "@tanstack/react-query";

export const useCart = (options?: UseQueryOptions<CartItem[], Error>) =>
  useQuery<CartItem[], Error>({
    queryKey: ["cart"],
    queryFn: getCart,
    ...options,
  });
