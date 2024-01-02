import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { DinnerTable } from './entities/dinner-table.entity';

@Injectable()
export class DinnerTableRepository {
  constructor(
    @InjectRepository(DinnerTable)
    private readonly dinnerTableRepository: Repository<DinnerTable>,
  ) {}

  async save(dinnerTable: DinnerTable) {
    return await this.dinnerTableRepository.save(dinnerTable);
  }
  async find(id: string) {
    return await this.dinnerTableRepository.findOneBy({ id });
  }
  async findManyBySeats(seats: number): Promise<DinnerTable[]> {
    return await this.dinnerTableRepository.find({
      where: {
        seats: MoreThanOrEqual(seats),
        active: true,
      },
    });
  }
  async findAll() {
    return await this.dinnerTableRepository.find();
  }
  async remove(dinnerTable: DinnerTable) {
    return this.dinnerTableRepository.remove(dinnerTable);
  }
}
