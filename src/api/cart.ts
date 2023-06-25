import axios from "axios";
import { CartItem } from "../types/cart";

const rootUrl = "http://localhost:3000";

export const getCart = async (): Promise<CartItem[]> => {
  const response = await axios.get<CartItem[]>(`${rootUrl}/cart`);
  return response.data;
};

export const addToCart = async (
  cartItem: Omit<CartItem, "id">
): Promise<CartItem> => {
  const response = await axios.post<CartItem>(`${rootUrl}/cart`, cartItem);
  return response.data;
};

export const updateQuantity = async (cartItem: CartItem): Promise<CartItem> => {
  const response = await axios.patch<CartItem>(
    `${rootUrl}/cart/${cartItem.id}`,
    cartItem
  );
  return response.data;
};
