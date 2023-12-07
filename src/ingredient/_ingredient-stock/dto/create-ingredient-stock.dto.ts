import { Type } from 'class-transformer';
import { Ingredient } from '../../entities/ingredient.entity';
import { IsNumber } from 'class-validator';

export class CreateIngredientStockDto {
  @Type(() => Ingredient)
  ingredient: Ingredient[];
  @IsNumber()
  amount: number;
}
