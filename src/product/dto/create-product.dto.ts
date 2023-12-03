import { IsArray, IsNumber, IsString } from 'class-validator';
import { Ingredient } from '../../ingredient/entities/ingredient.entity';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsNumber()
  price: number;
  @IsArray({ context: Ingredient })
  ingredients: Ingredient[];
}
