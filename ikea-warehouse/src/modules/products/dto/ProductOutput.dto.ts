import { ProductEntity } from 'src/entities/interfaces'

export interface ProductOutput extends ProductEntity {
  quantity: number
  totalPrice: number
}
