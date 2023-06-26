import axios from "axios"
import { CartItem } from "../types/cart"

const API_URL = "http://localhost:3000/"

export const getCart = async () => {
  const res = await axios.get<CartItem[]>(
    `${API_URL}cart`
  )
  return res.data
}