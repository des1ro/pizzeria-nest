import { IsNumber } from 'class-validator/types/decorator/decorators';

export class UpdateIngredientDto {
  @IsNumber()
  quantity: number;
}
