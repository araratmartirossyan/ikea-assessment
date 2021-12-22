import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// Schemas
import {
  ProductSchema,
  ArticleSchema,
  ArticleContainsSchema
} from 'src/entities/'

import { ProductInput, ProductOutput } from './dto/ProductOutput.dto'
import { ArticleEntity } from 'src/entities/interfaces'

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

  private async findArticlesByProducts(products: Partial<ProductInput[]>) {
    const ids = products
      .map(product => product.contain_articles.map(item => item.art_id.art_id))
      .flat()

    return this.articleSchema
      .createQueryBuilder('ArticleSchema')
      .where('art_id IN (:...ids)', { ids: [...new Set(ids)] })
      .getMany()
  }

  public async countQuantity(products: ProductInput[]) {
    const articles = await this.findArticlesByProducts(products)

    let availiableArticles = [...articles]
    const availiableProducts = []

    products.forEach(product => {
      const stocks = product.contain_articles.map(article => {
        const findArticle = availiableArticles.find(
          item => item.art_id === article.art_id.art_id
        )

        const neededAmount = product.quantity * article.amount_of

        return {
          possibleToSell: findArticle.stock >= neededAmount,
          articleId: article.art_id.art_id,
          needed: neededAmount
        }
      })

      const isAvailiable = stocks.every(item => item.possibleToSell === true)

      availiableArticles = articles.map(article => {
        const findStock = stocks.find(
          neededStock => neededStock.articleId === article.art_id
        )

        if (!findStock) {
          return article
        }

        return {
          ...article,
          stock: article.stock - findStock.needed
        }
      })

      availiableProducts.push({
        ...product,
        totalPrice: isAvailiable ? product.quantity * product.price : 0,
        isAvailiable: isAvailiable
      })
    })

    return availiableProducts
  }

  public async countAvaliableQuantity(products: ProductSchema[]) {
    const articles = await this.findArticlesByProducts(products)

    let availiableArticles = [...articles]
    const availiableProducts = []

    products.forEach(product => {
      const stocks = product.contain_articles.map(article => {
        const findArticle = availiableArticles.find(
          item => item.art_id === article.art_id.art_id
        )
        const quantity = Math.floor(findArticle.stock / article.amount_of)
        return quantity
      })

      const quantity = Math.min(...stocks.map(item => item))

      availiableProducts.push({
        ...product,
        quantity,
        totalPrice: quantity === 0 ? product.price : quantity * product.price,
        isAvailiable: quantity !== 0
      })
    })

    return availiableProducts
  }

  async getAll(): Promise<ProductOutput[]> {
    const products = await this.productSchema.find({
      relations: ['contain_articles', 'contain_articles.art_id']
    })

    if (products.length === 0) {
      return []
    }

    return this.countAvaliableQuantity(products)
  }

  async getArticles(): Promise<ArticleEntity[]> {
    return this.articleSchema.find()
  }

  async setProducts(products: ProductSchema[]) {
    const savedAmountForArticles = await Promise.all(
      products.map(async product => {
        const foundProduct = await this.productSchema.findOne({
          name: product.name
        })

        if (foundProduct) {
          await this.productSchema.update(
            {
              product_id: foundProduct.product_id
            },
            {
              price: Number(product.price),
              name: product.name
            }
          )

          return foundProduct
        }

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

        return createdProduct
      })
    )

    return savedAmountForArticles
  }

  async setArticles(articles: ArticleSchema[]) {
    // Cleanup in case of some injection
    return Promise.all(
      articles.map(async ({ art_id, name, stock }) => {
        const findCurrentArticle = await this.articleSchema.findOne({
          where: {
            art_id
          }
        })

        if (findCurrentArticle) {
          const updated = this.articleSchema.update(
            { art_id },
            {
              stock: findCurrentArticle.stock + Number(stock)
            }
          )

          return updated
        }

        return this.articleSchema.save({
          art_id,
          name,
          stock: Number(stock)
        })
      })
    )
  }

  public async updateArticleStock(products: ProductInput[]) {
    const flatProducts = products
      .map(product =>
        product.contain_articles.map(contain => ({
          art_id: contain.art_id.art_id,
          amount: contain.amount_of * product.quantity
        }))
      )
      .flat()

    const groupedArticles = flatProducts.reduce((acc, article) => {
      const findArticleIndex = acc.findIndex(
        item => item.art_id === article.art_id
      )

      if (findArticleIndex === -1) {
        acc.push(article)

        return acc
      }

      acc[findArticleIndex].amount =
        acc[findArticleIndex].amount + article.amount

      return acc
    }, [])

    const updatedStock = await Promise.all(
      groupedArticles.map(async ({ art_id, amount }) => {
        const findCurrentArticle = await this.articleSchema.findOne({
          where: {
            art_id
          }
        })

        return this.articleSchema.update(
          {
            art_id
          },
          {
            stock: findCurrentArticle.stock - amount
          }
        )
      })
    )

    return updatedStock
  }
}
