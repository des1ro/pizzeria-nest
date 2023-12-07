import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { ProductEnum } from '../enum/product.enum';
import { ProductIngredientQuantityDto } from './create-ingredient-quantity.dto';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsNumber()
  price: number;
  @IsEnum(ProductEnum)
  type: ProductEnum;
  @IsArray()
  @Type(() => ProductIngredientQuantityDto)
  productIngredientQuantity: ProductIngredientQuantityDto[];
}
