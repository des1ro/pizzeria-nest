import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/createReservation.dto';
import { Reservation } from './entity/reservation.entity';
import { reservationRepository } from './reservation.repo';
import { ReservationStatus } from './enum/reservationStatus.enum';
import { DinnerTableService } from '../dinner-table/dinner-table.service';
import { DinnerTable } from '../dinner-table/entities/dinner-table.entity';
import { UpdateReservationDTO } from './dto/updateReservation.dto';
import { RemoveResponse } from '../../shared/interfaces/removeResponse.interface';
import { EntityManager } from 'typeorm';
@Injectable()
export class ReservationService {
  constructor(
    private readonly repository: reservationRepository,
    private readonly dinnerTableService: DinnerTableService,
  ) {}

  async create(reservationDTO: CreateReservationDto): Promise<Reservation> {
    const reservation = await this.prepareReservation(reservationDTO);
    return await this.repository.save(reservation);
  }
  async createTransactional(
    reservationDTO: CreateReservationDto,
    transactionalEntityManager: EntityManager,
  ) {
    const reservation = await this.prepareReservation(reservationDTO);
    return transactionalEntityManager.save(Reservation, reservation);
  }
  async findAll(): Promise<Reservation[]> {
    const reservations = await this.repository.findAll();
    if (reservations.length === 0) {
      throw new NotFoundException('Not found any Reservation');
    }
    return reservations;
  }
  async findOne(id: string): Promise<Reservation> {
    const reservation = this.repository.findOne(id);
    if (!reservation) {
      throw new NotFoundException(`Reservation with id: ${id} not found`);
    }
    return reservation;
  }
  async update(
    id: string,
    updateReservationDto: UpdateReservationDTO,
  ): Promise<Reservation> {
    const reservation = await this.repository.findOne(id);
    const reservationToUpdate = Object.assign(
      reservation,
      updateReservationDto,
    );
    return await this.repository.save(reservationToUpdate);
  }
  async remove(id: string): Promise<RemoveResponse> {
    const reservation = await this.findOne(id);
    await this.repository.remove(reservation);
    return {
      success: true,
      message: `Reservation with id: ${id} removed successfuly`,
    };
  }
  private async findTable(seats: number): Promise<DinnerTable> {
    const table = await this.dinnerTableService.findBySeats(seats);
    return table;
  }
  private async prepareReservation(
    reservationDTO: CreateReservationDto,
  ): Promise<Reservation> {
    const reservation = new Reservation(reservationDTO);
    reservation.status = ReservationStatus.ACTIVE;
    const table = await this.findTable(reservation.seats);
    reservation.dinnerTable = table;
    return reservation;
  }
}
