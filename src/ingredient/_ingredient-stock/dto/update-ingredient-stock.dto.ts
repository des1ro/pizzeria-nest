import { IsNumber } from 'class-validator';

export class UpdateIngredientStockDto {
  @IsNumber()
  amount: number;
}
