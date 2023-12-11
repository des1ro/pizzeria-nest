import { IsEnum, IsString } from 'class-validator/types/decorator/decorators';
import { ReservationStatus } from '../enum/reservationStatus.enum';

export class UpdateReservationDTO {
  @IsString()
  name: string;
  @IsEnum(ReservationStatus)
  status: ReservationStatus;
}
