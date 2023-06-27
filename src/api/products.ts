import axios from "axios";
import { Product } from "../types/products";

const rootUrl = "http://localhost:3000";

type ProductStock = Pick<Product, "id" | "stock">


export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${rootUrl}/products`);
  return response.data;
};

export const updateProductStock = async (product: ProductStock) => {
  await axios.patch(`http://localhost:3000/products/${product.id}`, {
    stock: product.stock,
  })
}