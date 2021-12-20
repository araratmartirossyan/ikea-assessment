import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn
} from 'typeorm'
import { ArticleContainsSchema } from './ArticleContains'
import { ProductEntity } from './interfaces/product.interface'

@Entity()
export class ProductSchema implements ProductEntity {
  @PrimaryGeneratedColumn()
  product_id: number

  @Column({ length: 500 })
  name: string

  @OneToMany(() => ArticleContainsSchema, article => article.product)
  contain_articles: ArticleContainsSchema[]

  @Column()
  price: number
}
