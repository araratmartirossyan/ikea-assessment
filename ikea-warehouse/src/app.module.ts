import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import configuration from './config/configuration';
import { ProductModule } from './modules/products/product.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
