import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';
import { CreateReservationDto } from '../../reservation/dto/createReservation.dto';

export class CreateOrderDto {
  @IsArray()
  productsId: string[];
  @IsOptional()
  @IsString()
  discountCode: string;
  @IsOptional()
  @IsObject({ context: CreateReservationDto })
  reservation: CreateReservationDto;
}
