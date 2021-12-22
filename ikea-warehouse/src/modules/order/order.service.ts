import { Injectable } from '@nestjs/common'

// Schemas
import { ProductSchema } from 'src/entities/'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateOrderInput } from './dto/CreateOrderInput.dto'
import { ProductService } from '../products/product.service'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(ProductSchema)
    private productSchema: Repository<ProductSchema>,

    private productService: ProductService
  ) {}

  private async updateProductsQuantity({ products }: CreateOrderInput) {
    const foundProducts = await this.productSchema
      .createQueryBuilder('product')
      .where('product_id IN (:...ids)', {
        ids: products.map(({ product_id }) => product_id)
      })
      .leftJoinAndSelect('product.contain_articles', 'contain_articles')
      .leftJoinAndSelect('contain_articles.art_id', 'articles')
      .getMany()

    const productsWithUpdatedQuantites = foundProducts.map(item => {
      const foundProduct = products.find(
        ({ product_id }) => item.product_id === product_id
      )

      return {
        ...item,
        quantity: foundProduct.quantity
      }
    })

    return productsWithUpdatedQuantites
  }

  async submitOrder(input: CreateOrderInput) {
    const updatedProducts = await this.updateProductsQuantity(input)

    await this.productService.updateArticleStock(updatedProducts)

    return updatedProducts
  }

  async checkOrder(input: CreateOrderInput) {
    const productsWithUpdatedQuantites = await this.updateProductsQuantity(
      input
    )

    return this.productService.countQuantity(productsWithUpdatedQuantites)
  }
}
