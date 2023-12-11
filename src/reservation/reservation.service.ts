import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CreateReservationDto } from './dtos/createReservation.dto';
import { Reservation } from './entity/reservation.entity';
import { reservationRepository } from './reservation.repo';
import { ReservationStatus } from './enum/reservationStatus.enum';
@Injectable()
export class ReservationService {
  constructor(
    private readonly repository: reservationRepository,
    private readonly entityManager: EntityManager,
  ) {}

  async create(reservationDTO: CreateReservationDto) {
    const reservation = new Reservation(reservationDTO);
    reservation.status = ReservationStatus.ACTIVE;
    //   const table = await this.findTable(reservation.seats);
    //   if (table === null) {
    //     throw new Error('No free table for that many people');
    //   }
    //   reservation.table = table;
    // return await  this.repository.save(reservation);
  }
  update() {}
  delete() {}
  //   private async findTable(seats: number): Promise<DinnerTable> {
  //     const table = await this.entityManager.findOne(DinnerTable, {
  //       where: { seats: MoreThanOrEqual(seats) },
  //     });
  //     return table;
  //   }
}
