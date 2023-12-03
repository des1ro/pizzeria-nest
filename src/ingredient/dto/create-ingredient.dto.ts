import { IsString, IsNumber } from 'class-validator/types/decorator/decorators';

export class CreateIngredientDto {
  @IsString()
  name: string;
  @IsNumber()
  quantity: number;
}
