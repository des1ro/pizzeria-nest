import { IsEnum, IsString } from 'class-validator/types/decorator/decorators';
import { ReservationStatus } from '../enum/reservationStatus.enum';
import { CreateReservationDto } from './createReservation.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateReservationDTO extends PartialType(CreateReservationDto) {
  @IsString()
  name: string;
  @IsEnum(ReservationStatus)
  status: ReservationStatus;
}
