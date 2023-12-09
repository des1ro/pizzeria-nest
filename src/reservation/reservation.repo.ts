import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entity/reservation.entity';
import { Repository } from 'typeorm';
@Injectable()
export class reservationRepository {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async save(reservation: Reservation) {
    return await this.reservationRepository.save(reservation);
  }
  async findOne(id: string) {
    return await this.reservationRepository.findOneBy({ id });
  }

  async findAll() {
    return await this.reservationRepository.find();
  }
  async delete(reservation: Reservation) {
    return await this.reservationRepository.remove(reservation);
  }
}
