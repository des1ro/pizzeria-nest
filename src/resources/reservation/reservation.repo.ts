import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entity/reservation.entity';
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
    return await this.reservationRepository.findOne({
      where: { id: id },
      relations: { order: true },
    });
  }

  async findAll() {
    return await this.reservationRepository.find();
  }
  async remove(reservation: Reservation) {
    return await this.reservationRepository.remove(reservation);
  }
}
