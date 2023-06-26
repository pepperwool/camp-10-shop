import axios from "axios"
import { CartItem } from "../types/cart"
import { Product } from "../types/products"
import { MutatedCartItem } from "../types/cart"

const API_URL = "http://localhost:3000"

export const getCart = async () => {
  const res = await axios.get<CartItem[]>(`${API_URL}/cart`)
  return res.data
}

export const addToCart = async (item: MutatedCartItem) => {
  const res = await axios.post<CartItem>(`${API_URL}/cart`, { ...item })
  return res.data
}

export const updateItem = async (updatedItem: CartItem) => {
  const res = await axios.patch<CartItem>(`${API_URL}/cart/${updatedItem.id}`, {
    quantity: updatedItem.quantity
  })

  return res.data
}

export const deleteItem = async (item: CartItem) => {
  const { data: product } = await axios.get<Product>(
    `http://localhost:3000/products/${item.productId}`
  )
  // console.log(product.stock + item.quantity)
  await axios.patch(`http://localhost:3000/products/${item.productId}`, {
    stock: product.stock + item.quantity
  })
  await axios.delete(`http://localhost:3000/cart/${item.id}`)
}
