import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductIngredientQuantity } from './entities/product.ingredient.quantity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductIngredientQuantity])],

  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
