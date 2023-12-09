import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DinnerTable } from './entities/dinner-table.entity';

@Injectable()
export class DinnerTableRepository {
  constructor(
    @InjectRepository(DinnerTable)
    private readonly dinnerTableRepository: Repository<DinnerTable>,
  ) {}

  async saveDinnerTable(dinnerTable: DinnerTable) {
    return await this.dinnerTableRepository.save(dinnerTable);
  }

  async findDinnerTable(id: string) {
    return await this.dinnerTableRepository.findOneBy({ id });
  }

  async findAllDinnerTables() {
    return await this.dinnerTableRepository.find();
  }
  async removeDinnerTable(dinnerTable: DinnerTable) {
    return this.dinnerTableRepository.remove(dinnerTable);
  }
}
