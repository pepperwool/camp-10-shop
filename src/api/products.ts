import axios from "axios";
import { Product } from "../types/products";

const rootUrl = "http://localhost:3000";

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${rootUrl}/products`);
  return response.data;
};
