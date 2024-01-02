import { IsNumber } from 'class-validator';

export class UpdateDiscountDto {
  @IsNumber()
  quantity: number;
}
