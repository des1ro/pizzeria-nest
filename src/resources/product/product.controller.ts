import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return await this.productService.create(createProductDto);
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: error,
        description: error.message,
      });
    }
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.productService.findOne(id);
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: error,
        description: error.message,
      });
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.productService.remove(id);
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: error,
        description: error.message,
      });
    }
  }
}
