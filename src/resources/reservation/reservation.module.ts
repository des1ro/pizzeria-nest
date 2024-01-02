import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entity/reservation.entity';
import { reservationRepository } from './reservation.repo';
import { DinnerTableModule } from '../dinner-table/dinner-table.module';
import { ReservationController } from './reservation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), DinnerTableModule],
  providers: [ReservationService, reservationRepository],
  exports: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}
