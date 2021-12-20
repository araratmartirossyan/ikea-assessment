import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

// Schemas
import { ProductEntity } from './models/product.schema'
import { ArticleEntity } from './models/article.schema';

import { ArticleInput } from './dto/ArticleDto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private productSchema: Model<ProductEntity>,
    @Inject('ARTICLE_MODEL')
    private articleSchema: Model<ArticleEntity>
  ) { }

  async getAll(): Promise<ProductEntity[]> {

    return this.productSchema.find();
  }

  async create(body: ProductEntity) {
    const entity = new this.productSchema(body);

    return this.productSchema.create(entity);
  }

  async uploadProducts() {

  }

  async setArticles(articles: ArticleEntity[]) {
    // Cleanup in case of some hidden value
    const input = articles.map(({ art_id, name, stock }) => ({
      art_id, name, stock
    }))

    return this.articleSchema.insertMany(input)
  }
}
