import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredientStockDto } from './create-ingredient-stock.dto';
import { IsNumber } from 'class-validator';

export class UpdateIngredientStockDto extends PartialType(
  CreateIngredientStockDto,
) {
  @IsNumber()
  amount: number;
}
