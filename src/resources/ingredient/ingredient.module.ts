import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { IngredientRepository } from './ingredient.repo';
import { IngredientStockRepository } from './_ingredient-stock/ingredient-stock.repo';
import { IngredientStockService } from './_ingredient-stock/ingredient-stock.service';
import { IngredientStockController } from './_ingredient-stock/ingredient-stock.controller';
import { IngredientStock } from './_ingredient-stock/entities/ingredient.stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, IngredientStock])],
  controllers: [IngredientController, IngredientStockController],
  providers: [
    IngredientService,
    IngredientRepository,
    IngredientStockService,
    IngredientStockRepository,
  ],
  exports: [IngredientStockService],
})
export class IngredientModule {}
