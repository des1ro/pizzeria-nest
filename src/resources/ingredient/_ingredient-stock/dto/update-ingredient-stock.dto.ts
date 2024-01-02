import { IsNumber } from 'class-validator';

export class UpdateIngredientStockDto {
  @IsNumber()
  quantity: number;
}
