import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDinnerTableDto } from './dto/create-dinner-table.dto';
import { UpdateDinnerTableDto } from './dto/update-dinner-table.dto';
import { DinnerTable } from './entities/dinner-table.entity';
import { DinnerTableRepository } from './dinner-table.repo';
import { RemoveResponse } from '../shared/removeResponse.interface';

@Injectable()
export class DinnerTableService {
  constructor(private readonly repository: DinnerTableRepository) {}
  async create(createDinnerTableDto: CreateDinnerTableDto) {
    const dinnerTable = new DinnerTable(createDinnerTableDto);
    return await this.repository.saveDinnerTable(dinnerTable);
  }

  async findAll(): Promise<DinnerTable[]> {
    const dinnerTables = await this.repository.findAllDinnerTables();
    if (dinnerTables.length === 0) {
      throw new NotFoundException(`Dinner Tables not found`);
    }
    return;
  }

  async findOne(id: string): Promise<DinnerTable> {
    const dinnerTable = await this.repository.findDinnerTable(id);
    if (!dinnerTable) {
      throw new NotFoundException(`Dinner Table with ID ${id} not found`);
    }
    return dinnerTable;
  }

  async update(
    id: string,
    updateDinnerTableDto: UpdateDinnerTableDto,
  ): Promise<DinnerTable> {
    const dinnerTable = await this.findOne(id);
    Object.assign(dinnerTable, updateDinnerTableDto);
    return await this.repository.saveDinnerTable(dinnerTable);
  }

  async remove(id: string): Promise<RemoveResponse> {
    const dinnerTable = await this.findOne(id);
    await this.repository.removeDinnerTable(dinnerTable);
    return { success: true, message: 'Dinner Table removed successfully' };
  }
}
