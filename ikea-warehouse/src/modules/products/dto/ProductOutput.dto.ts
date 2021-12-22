import { ProductEntity } from 'src/entities/interfaces'

export interface ProductOutput extends ProductEntity {
  quantity: number
  totalPrice: number
}

export interface ProductInput extends ProductEntity {
  quantity?: number
  totalPrice?: number
}
