import { IsNumber, IsString } from 'class-validator';

export class CreateDiscountDto {
  @IsString()
  name: string;
  @IsString()
  code: string;
  @IsNumber()
  value: number;
  @IsNumber()
  quantity: number;
}
