export type CartItem = {
  id: number
  productId: number
  quantity: number
}

export type MutatedCartItem = Omit<CartItem, "id">