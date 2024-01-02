import { IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IngredientDto } from '../../../ingredient/dto/create-ingredient.dto';

export class ProductIngredientQuantityDto {
  @ValidateNested()
  @Type(() => IngredientDto)
  ingredient: IngredientDto;

  @IsNumber()
  quantity: number;
}
