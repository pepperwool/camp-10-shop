import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import { Product } from "../types/products";
import { UseQueryOptions } from "@tanstack/react-query";

export const useProducts = (options?: UseQueryOptions<Product[], Error>) =>
  useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: () => getProducts(),
    ...options,
  });
