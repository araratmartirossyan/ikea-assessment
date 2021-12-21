import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  JoinTable
} from 'typeorm'
import { ProductSchema } from '.'
import { ArticleSchema } from './Article.entity'
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
