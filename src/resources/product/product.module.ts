import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductIngredientQuantity } from './_product.ingredients/entity/product.ingredient.quantity.entity';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repo';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductIngredientQuantity])],

  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
