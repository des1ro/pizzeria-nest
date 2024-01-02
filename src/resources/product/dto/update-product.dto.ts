import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { ProductIngredientQuantityDto } from '../_product.ingredients/dto/product-ingredient-quantity.dto';

export class UpdateProductDto {
  @IsOptional()
  @IsNumber()
  price: number;
  @IsOptional()
  @IsArray()
  @Type(() => ProductIngredientQuantityDto)
  productIngredientQuantity: ProductIngredientQuantityDto[];
}
