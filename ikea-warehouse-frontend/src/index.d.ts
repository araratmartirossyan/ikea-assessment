import { AxiosResponse } from 'axios'

declare namespace Warehouse {
  interface ProductEntity {
    product_id: number
    name: string
    price: number
    contain_articles: ArticleContainsEntity[]
    quantity: number
    totalPrice: number
    isAvailiable?: boolean
    choosenQuantity?: number
  }

  interface ProductsResponse extends AxiosResponse {
    products: ProductEntity[]
  }

  interface ArticlesReponse extends AxiosResponse {
    articles: ArticleEntity[]
  }

  interface ArticleEntity {
    name: string
    stock: number
    art_id: ArticleContainsEntity
  }

  interface ArticleContainsEntity {
    id: number
    art_id: ArticleEntity
    product: ProductEntity
    amount_of: number
  }

  type OrderProduct = {
    product_id: number
    quantity: number
  }
}
