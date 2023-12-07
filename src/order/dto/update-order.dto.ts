import { Product } from '../../product/entities/product.entity';
import { IsArray } from 'class-validator';

export class UpdateOrderDto {
  @IsArray({ context: Product })
  products: Product[];
}
