import { IsString } from 'class-validator';

export class UpdateIngredientDto {
  @IsString()
  name: string;
}
