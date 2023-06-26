import axios from "axios"
import { CartItem } from "../types/cart"

const API_URL = "http://localhost:3000"

export const getCart = async () => {
  const res = await axios.get<CartItem[]>(`${API_URL}/cart`)
  return res.data
}

export const addToCart = async (item: Omit<CartItem, "id">) => {
  const res = await axios.post<CartItem>(`${API_URL}/cart`, { ...item })
  return res.data
}

export const updateItem = async (updatedItem: CartItem) => {
  const res = await axios.patch<CartItem>(`${API_URL}/cart/${updatedItem.id}`, {
    quantity: updatedItem.quantity
  })

  return res.data
}