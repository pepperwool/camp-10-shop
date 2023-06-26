import axios from "axios"
import { Product } from "../types/products"

const API_URL = "http://localhost:3000/"

export const getProducts = async () => {
  const res = await axios.get<Product[]>(
    `${API_URL}products`
  )
  return res.data
}