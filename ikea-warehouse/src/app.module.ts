import { Module } from '@nestjs/common'

import { ProductModule } from './modules/products/product.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from './modules/config/config.service'
import { ConfigModule } from './modules/config/config.module'

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        console.log(await configService.typeOrmModuleOptions())
        return await configService.typeOrmModuleOptions()
      },
      inject: [ConfigService]
    }),
    ProductModule
  ]
})
export class AppModule {}
