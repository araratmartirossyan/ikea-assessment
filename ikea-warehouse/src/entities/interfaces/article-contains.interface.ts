import { ArticleSchema, ProductSchema } from '..'

export interface ArticleContains {
  id: number
  art_id: ArticleSchema
  product: ProductSchema
  amount_of: number
}
