import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entity/reservation.entity';
import { DinnerTable } from './entity/dinnerTable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, DinnerTable])],
  providers: [ReservationService],
})
export class ReservationModule {}
