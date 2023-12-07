import { Injectable } from '@nestjs/common';
import { CreateDinnerTableDto } from './dto/create-dinner-table.dto';
import { UpdateDinnerTableDto } from './dto/update-dinner-table.dto';
import { DinnerTable } from './entities/dinner-table.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';

@Injectable()
export class DinnerTableService {
  constructor(
    @InjectRepository(DinnerTable)
    private readonly dinnerTableRepository: Repository<DinnerTable>,
    private readonly entityMenager: EntityManager,
  ) {}
  create(createDinnerTableDto: CreateDinnerTableDto) {
    const dinnerTable = new DinnerTable(createDinnerTableDto);
    this.dinnerTableRepository.save(dinnerTable);
  }

  async findAll(): Promise<DinnerTable[]> {
    return await this.dinnerTableRepository.find();
  }

  async findOne(id: string): Promise<DinnerTable> {
    const dinnerTable = await this.dinnerTableRepository.findOneBy({ id });
    if (!dinnerTable) {
      throw Error(`Dinner Table with ID ${id} not found`);
    }
    return dinnerTable;
  }

  async update(id: string, updateDinnerTableDto: UpdateDinnerTableDto) {
    const dinnerTable = await this.findOne(id);
    this.dinnerTableRepository.merge(dinnerTable, updateDinnerTableDto);
    this.dinnerTableRepository.save(dinnerTable);
  }

  async remove(id: string) {
    const dinnerTable = await this.findOne(id);
    this.dinnerTableRepository.delete(dinnerTable);
  }
}
