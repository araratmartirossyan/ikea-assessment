type OrderProduct = {
  product_id: number
  quantity: number
}

export interface CreateOrderInput {
  products: OrderProduct[]
}
