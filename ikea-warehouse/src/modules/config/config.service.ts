import { Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { BaseConnectionOptions } from 'typeorm/connection/BaseConnectionOptions'
import {
  ArticleSchema,
  ProductSchema,
  ArticleContainsSchema
} from 'src/entities'

@Injectable()
export class ConfigService {
  async typeOrmModuleOptions(
    options?: Partial<BaseConnectionOptions>
  ): Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      host: 'db',
      username: 'admin',
      password: 's0mePassword',
      database: 'ikea',
      entities: [ArticleSchema, ProductSchema, ArticleContainsSchema],
      synchronize: true,
      extra: {
        decimalNumbers: true
      }
    }
  }
}
