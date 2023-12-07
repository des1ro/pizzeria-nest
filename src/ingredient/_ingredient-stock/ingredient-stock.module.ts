import { Module } from '@nestjs/common';
import { IngredientStockService } from './ingredient-stock.service';
import { IngredientStockController } from './ingredient-stock.controller';

@Module({
  controllers: [IngredientStockController],
  providers: [IngredientStockService],
})
export class IngredientStockModule {}
