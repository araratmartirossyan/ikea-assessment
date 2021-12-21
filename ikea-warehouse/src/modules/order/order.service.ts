import { Injectable } from '@nestjs/common'

// Schemas
import {
  ProductSchema,
  ArticleSchema,
  ArticleContainsSchema
} from 'src/entities/'
import { ArticleContains, ProductEntity } from 'src/entities/interfaces'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateOrderInput } from './dto/CreateOrderInput.dto'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(ProductSchema)
    private productSchema: Repository<ProductSchema>,

    @InjectRepository(ArticleSchema)
    private articleSchema: Repository<ArticleSchema>,

    @InjectRepository(ArticleContainsSchema)
    private articleContainsSchema: Repository<ArticleContainsSchema>
  ) {}

  async submitOrder({ products }: CreateOrderInput) {
    // const foundProducts = await this.productSchema.find({
    //   relations: ['contain_articles', 'contain_articles.art_id']
    // })\

    const foundProducts = await this.productSchema
      .createQueryBuilder('product')
      .where('product_id IN (:...ids)', {
        ids: products.map(({ product_id }) => product_id)
      })
      .leftJoinAndSelect('product.contain_articles', 'contain_articles')
      .getMany()

    return foundProducts

    // Checking list of products in order
    // - Checking if quantity still availiable on moment of submission
    // returning result
  }
}
