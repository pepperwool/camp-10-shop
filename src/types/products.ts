export type Product = {
  id: number
  name: string
  description: string
  image: string
  category: Category
  sport: Sport
  price: number
  stock: number
  // reviews
}

export type Category = "shoes" | "shirts" | "pants" | "accessoires" | "other"
export type Sport =
  | "running"
  | "american-football"
  | "basketball"
  | "tennis"
  | "other"
