import { IsNumber, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  name: string;

  @IsNumber()
  seats: number;
}
