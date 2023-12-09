import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductIngredientQuantity } from './entities/product.ingredient.quantity.entity';
import { ProductRepository } from './product.repo';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductIngredientQuantity])],

  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
