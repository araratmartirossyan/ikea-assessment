import { Injectable, Inject } from '@nestjs/common'
import { Model } from 'mongoose'

// Schemas
import {
  ProductSchema,
  ArticleSchema,
  ArticleContainsSchema
} from 'src/entities/'
import { ArticleContains, ProductEntity } from 'src/entities/interfaces'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

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

  async getAll(): Promise<ProductSchema[]> {
    return this.productSchema.find({
      relations: ['contain_articles'],
      join: {
        alias: 'ArTIcle',
        leftJoinAndSelect: {
          following: 'contain_articles.art_id'
        }
      }
    })
    // const products = await this.productSchema.aggregate([
    //   {
    //     $lookup: {
    //       from: 'articles',
    //       foreignField: 'art_id',
    //       localField: 'contain_articles.art_id',
    //       as: 'articles'
    //     }
    //   },
    //   {
    //     $unwind: {
    //       path: '$contain_articles.art_id'
    //     }
    //   }
    // ])
    // let articles = await this.articleSchema.find()
    // return products
    // const availiableProducts = []
    // products.forEach(product => {
    //   const stocks = product.contain_articles.map(article => {
    //     const findArticle = articles.find(
    //       item => item.art_id === article.art_id
    //     )
    //     const quantity = Math.floor(findArticle.stock / article.amount_of)
    //     return {
    //       quantity,
    //       articleId: article.art_id,
    //       needed: article.amount_of
    //     }
    //   })
    //   const quantity = Math.min(...stocks.map(item => item.quantity))
    //   articles = articles.map(article => {
    //     const findStock = stocks.find(
    //       neededStock => neededStock.articleId === article.art_id
    //     )
    //     if (!findStock) {
    //       return article
    //     }
    //     return {
    //       ...article,
    //       stock: article.stock - quantity * findStock.needed
    //     }
    //   })
    //   availiableProducts.push({
    //     ...product,
    //     quantity,
    //     totalPrice: quantity * Number(product.price).toFixed(2)
    //   })
    // })
    // return availiableProducts
  }

  async setProducts(products: ProductSchema[]) {
    const savedAmountForArticles = await Promise.all(
      products.map(async product => {
        const createdProduct = await this.productSchema.save(product)

        const articles = await Promise.all(
          product.contain_articles.map(
            async article =>
              await this.articleContainsSchema.save({
                product: createdProduct.product_id,
                ...article
              })
          )
        )

        // const contain_articles = articles.map(item => ({ id: item.id }))

        // console.log(articles, 'ARTICLES')

        // await this.productSchema.update(
        //   { product_id: createdProduct.product_id },
        //   {
        //     contain_articles
        //   }
        // )

        // ({
        //   ...product,
        //   contains_articles: await Promise.all(
        //     product.contain_articles.map(async article => ({
        //       id: await (await this.articleContainsSchema.save(article)).id
        //     }))
        //   )
        // })
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
