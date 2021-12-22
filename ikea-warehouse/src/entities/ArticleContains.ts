import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { ProductSchema } from '.'
import { ArticleSchema } from './Article'
import { ArticleContains } from './interfaces'

@Entity('article-contains')
export class ArticleContainsSchema implements ArticleContains {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => ArticleSchema)
  @JoinColumn()
  art_id: ArticleSchema

  @ManyToOne(() => ProductSchema, product => product.contain_articles)
  product: ProductSchema

  @Column()
  amount_of: number
}
