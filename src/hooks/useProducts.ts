import { getProducts } from "../api/getProducts"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { Product } from "../types/products"

export const useProducts = (options?: UseQueryOptions<Product[], Error>) =>
  useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    ...options,
  })
