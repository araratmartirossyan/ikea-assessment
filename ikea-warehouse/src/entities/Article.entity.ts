import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { ArticleContainsSchema } from '.'
import { ArticleEntity } from './interfaces/article.interface'

@Entity('article')
export class ArticleSchema {
  @PrimaryGeneratedColumn()
  art_id: number

  @Column({ length: 500 })
  name: string

  @Column()
  stock: number

  @OneToMany(() => ArticleContainsSchema, article => article.art_id)
  @JoinColumn()
  articlesContain: ArticleContainsSchema[]
}
