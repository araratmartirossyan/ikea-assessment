import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateOrderInput } from './dto/CreateOrderInput.dto'

import { OrderService } from './order.service'

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/orders')
  async createOrder(@Body() products: CreateOrderInput) {
    return this.orderService.submitOrder(products)
  }
}
