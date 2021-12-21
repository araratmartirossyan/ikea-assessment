import { Module } from '@nestjs/common'

import { ProductModule } from './modules/products/product.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from './modules/config/config.service'
import { ConfigModule } from './modules/config/config.module'
import { OrderModule } from './modules/order/order.module'

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return configService.typeOrmModuleOptions()
      },
      inject: [ConfigService]
    }),
    ProductModule,
    OrderModule
  ]
})
export class AppModule {}
