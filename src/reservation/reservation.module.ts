import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entity/reservation.entity';
import { reservationRepository } from './reservation.repo';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  providers: [ReservationService, reservationRepository],
})
export class ReservationModule {}
