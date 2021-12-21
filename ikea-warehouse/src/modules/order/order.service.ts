import { Injectable } from '@nestjs/common'

// Schemas
import {
  ProductSchema,
  ArticleSchema,
  ArticleContainsSchema
} from 'src/entities/'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateOrderInput } from './dto/CreateOrderInput.dto'
import { ProductService } from '../products/product.service'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(ProductSchema)
    private productSchema: Repository<ProductSchema>,

    @InjectRepository(ArticleSchema)
    private articleSchema: Repository<ArticleSchema>,

    @InjectRepository(ArticleContainsSchema)
    private articleContainsSchema: Repository<ArticleContainsSchema>,

    private productService: ProductService
  ) {}

  async submitOrder({ products }: CreateOrderInput) {
    const foundProducts = await this.productSchema
      .createQueryBuilder('product')
      .where('product_id IN (:...ids)', {
        ids: products.map(({ product_id }) => product_id)
      })
      .leftJoinAndSelect('product.contain_articles', 'contain_articles')
      .leftJoinAndSelect('contain_articles.art_id', 'articles')
      .getMany()

    return this.productService.countAvaliableQuantity(foundProducts)
  }
}
