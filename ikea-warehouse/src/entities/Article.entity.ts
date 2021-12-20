import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { ArticleEntity } from './interfaces/article.interface'

@Entity()
export class ArticleSchema {
  @PrimaryGeneratedColumn()
  art_id: number

  @Column({ length: 500 })
  name: string

  @Column()
  stock: number
}
