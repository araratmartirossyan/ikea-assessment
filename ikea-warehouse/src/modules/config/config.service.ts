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
      host: process.env.MYSQL_HOST,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [ArticleSchema, ProductSchema, ArticleContainsSchema],
      synchronize: true,
      extra: {
        decimalNumbers: true
      }
    }
  }
}
