import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { isValidJSONString } from 'src/utils/validateJson.util'
import { ProductService } from './product.service'

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/products')
  async products() {
    return this.productService.getAll()
  }

  @Post('/products/upload')
  @UseInterceptors(FileInterceptor('file'))
  async createProducts(@UploadedFile() file: Express.Multer.File) {
    if (file.mimetype !== 'application/json') {
      return new BadRequestException('Wrong file type')
    }

    const parsedBuffer = file.buffer.toString()

    if (!parsedBuffer || !isValidJSONString(parsedBuffer)) {
      return new BadRequestException('File is Empty or JSON is not valid')
    }

    const data = JSON.parse(file.buffer.toString())

    const isEmpty = !data || data.products.length === 0

    if (isEmpty) {
      return new BadRequestException('File is Empty')
    }

    console.log(data.products)

    return this.productService.setProducts(data.products)
  }

  @Post('/articles/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadArticles(@UploadedFile() file: Express.Multer.File) {
    if (file.mimetype !== 'application/json') {
      return new BadRequestException('Wrong file type')
    }

    const parsedBuffer = file.buffer.toString()

    if (!parsedBuffer || !isValidJSONString(parsedBuffer)) {
      return new BadRequestException('File is Empty or JSON is not valid')
    }

    const data = JSON.parse(file.buffer.toString())

    const isEmpty = !data || data.articles.length === 0

    if (isEmpty) {
      return new BadRequestException('File is Empty')
    }

    return this.productService.setArticles(data.articles)
  }
}
