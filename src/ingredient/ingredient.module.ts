import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { Ingredient } from './entities/ingredient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientStock } from './_ingredient-stock/entities/ingredient.stock.entity';
import { IngredientStockModule } from './_ingredient-stock/ingredient-stock.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ingredient, IngredientStock]),
    IngredientStockModule,
  ],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientModule {}
