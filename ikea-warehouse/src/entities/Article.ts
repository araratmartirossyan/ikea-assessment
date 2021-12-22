import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn
} from 'typeorm'
import { ArticleContainsSchema } from '.'
import { ArticleEntity } from './interfaces/article.interface'

@Entity('article')
export class ArticleSchema implements ArticleEntity {
  @PrimaryGeneratedColumn()
  art_id: number

  @Column({ length: 500 })
  name: string

  @Column('int')
  stock: number

  @OneToMany(() => ArticleContainsSchema, article => article.art_id)
  @JoinColumn()
  articlesContain: ArticleContainsSchema[]
}
