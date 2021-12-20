import { ArticleContains } from '.'

export interface ProductEntity {
  product_id: number
  name: string
  price: number
  contain_articles: ArticleContains[]
}
