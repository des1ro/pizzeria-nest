import { IsNumber, IsString } from 'class-validator';

export class CreateIngredientStockDto {
  @IsString()
  ingredientId: string;
  @IsNumber()
  quantity: number;
}
