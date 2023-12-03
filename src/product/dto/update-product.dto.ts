import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsArray, IsNumber } from 'class-validator/types/decorator/decorators';
import { Ingredient } from '../../ingredient/entities/ingredient.entity';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsNumber()
  price: number;
  @IsArray({ context: Ingredient })
  ingredients: Ingredient[];
}
