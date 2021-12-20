import { Module } from '@nestjs/common';
import { Connection } from 'mongoose';
import { DatabaseModule } from 'src/database/database.module';
import { ProductSchema } from './models/product.schema';
import { ProductController } from './products.controller';
import { ProductService } from './product.service';
import { ArticleSchema } from './models/article.schema';

export const productSchemaProvider = [
  {
    provide: 'PRODUCT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Product', ProductSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'ARTICLE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Article', ArticleSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [ProductService, ...productSchemaProvider],
})
export class ProductModule { }
