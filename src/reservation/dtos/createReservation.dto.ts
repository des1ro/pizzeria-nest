import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ReservationStatus } from '../enum/reservationStatus.enum';

export class CreateReservationDto {
  @IsString()
  name: string;
  @IsEnum(ReservationStatus)
  reservationStatus: ReservationStatus;
  @IsNumber()
  seats: number;
}
