import { IsArray, IsString } from 'class-validator';
import { Product } from '../../product/entities/product.entity';

export class CreateOrderDto {
  @IsArray({ context: Product })
  products: Product[];
  @IsString()
  discountCode: string;
}
