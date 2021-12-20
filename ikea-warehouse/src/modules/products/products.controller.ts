import { Controller, Get, Post, Body, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { isValidJSONString } from 'src/utils/validateJson.util';
import { ArticleInput } from './dto/ArticleDto';
import { ArticleEntity } from './models/article.schema';
import { ProductEntity } from './models/product.schema';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get('/products')
  async products() {
    return this.productService.getAll();
  }

  @Post('/products/upload')
  async createProducts(@Body() product: ProductEntity) {
    return this.productService.create(product);
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

