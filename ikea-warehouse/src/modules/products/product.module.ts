import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductController } from './products.controller'
import { ProductService } from './product.service'
import {
  ProductSchema,
  ArticleSchema,
  ArticleContainsSchema
} from 'src/entities'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductSchema,
      ArticleSchema,
      ArticleContainsSchema
    ])
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
