import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import {
  ProductSchema,
  ArticleSchema,
  ArticleContainsSchema
} from 'src/entities'
import { ProductModule } from '../products/product.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductSchema,
      ArticleSchema,
      ArticleContainsSchema
    ]),
    ProductModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
