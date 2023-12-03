import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entity/reservation.entity';
import { EntityManager, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateReservationDto } from './dtos/createReservation.dto';
import { DinnerTable } from './entity/dinnerTable.entity';
@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(reservationDTO: CreateReservationDto) {
    const reservation = new Reservation(reservationDTO);
    const table = await this.findTable(reservation.seats);
    if (table === null) {
      throw new Error('No free table for that many people');
    }
    reservation.table = table;
    this.reservationRepository.save(reservation);
  }
  update() {}
  delete() {}
  private async findTable(seats: number): Promise<DinnerTable> {
    const table = await this.entityManager.findOne(DinnerTable, {
      where: { seats: MoreThanOrEqual(seats) },
    });
    return table;
  }
}
