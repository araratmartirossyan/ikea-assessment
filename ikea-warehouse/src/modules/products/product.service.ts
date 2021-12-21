import { Injectable, Inject } from '@nestjs/common'

// Schemas
import {
  ProductSchema,
  ArticleSchema,
  ArticleContainsSchema
} from 'src/entities/'
import {
  ArticleContains,
  ArticleEntity,
  ProductEntity
} from 'src/entities/interfaces'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProductOutput } from './dto/ProductOutput.dto'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductSchema)
    private productSchema: Repository<ProductSchema>,

    @InjectRepository(ArticleSchema)
    private articleSchema: Repository<ArticleSchema>,

    @InjectRepository(ArticleContainsSchema)
    private articleContainsSchema: Repository<ArticleContainsSchema>
  ) {}

  public async countQuantity(products: ProductEntity[]) {
    const ids = products
      .map(product => product.contain_articles.map(item => item.art_id.art_id))
      .flat()

    const articles = await this.articleSchema
      .createQueryBuilder('ArticleSchema')
      .where('art_id IN (:...ids)', { ids: [...new Set(ids)] })
      .getMany()

    let availiableArticles = [...articles]
    const availiableProducts = []

    products.forEach(product => {
      const stocks = product.contain_articles.map(article => {
        const findArticle = availiableArticles.find(
          item => item.art_id === article.art_id.art_id
        )
        const quantity = Math.floor(findArticle.stock / article.amount_of)
        return {
          quantity,
          articleId: article.art_id.art_id,
          needed: article.amount_of
        }
      })

      const quantity = Math.min(...stocks.map(item => item.quantity))

      availiableArticles = articles.map(article => {
        const findStock = stocks.find(
          neededStock => neededStock.articleId === article.art_id
        )

        if (!findStock) {
          return article
        }

        return {
          ...article,
          stock: article.stock - quantity * findStock.needed
        }
      })

      availiableProducts.push({
        ...product,
        quantity,
        totalPrice: quantity === 0 ? product.price : quantity * product.price
      })
    })

    return availiableProducts
  }

  async getAll(): Promise<ProductOutput[]> {
    const products = await this.productSchema.find({
      relations: ['contain_articles', 'contain_articles.art_id']
    })

    return this.countQuantity(products)
  }

  async setProducts(products: ProductSchema[]) {
    const savedAmountForArticles = await Promise.all(
      products.map(async product => {
        const createdProduct = await this.productSchema.save({
          ...product,
          price: Number(product.price)
        })

        product.contain_articles.forEach(article => {
          this.articleContainsSchema.save({
            product: createdProduct.product_id,
            ...article
          })
        })
      })
    )

    return savedAmountForArticles
  }

  async setArticles(articles: ArticleSchema[]) {
    // Cleanup in case of some injection
    const input = articles.map(({ art_id, name, stock }) => ({
      art_id,
      name,
      stock
    }))

    return this.articleSchema.save(input)
  }
}
