import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
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
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
