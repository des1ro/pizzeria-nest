import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDinnerTableDto } from './dto/create-dinner-table.dto';
import { UpdateDinnerTableDto } from './dto/update-dinner-table.dto';
import { DinnerTable } from './entities/dinner-table.entity';
import { DinnerTableRepository } from './dinner-table.repo';
import { RemoveResponse } from '../../shared/interfaces/removeResponse.interface';

@Injectable()
export class DinnerTableService {
  constructor(private readonly repository: DinnerTableRepository) {}
  create(createDinnerTableDto: CreateDinnerTableDto) {
    const dinnerTable = new DinnerTable(createDinnerTableDto);
    return this.repository.save(dinnerTable);
  }
  async update(
    id: string,
    updateDinnerTableDto: UpdateDinnerTableDto,
  ): Promise<DinnerTable> {
    const dinnerTable = await this.findOne(id);
    Object.assign(dinnerTable, updateDinnerTableDto);
    return this.repository.save(dinnerTable);
  }

  async findAll(): Promise<DinnerTable[]> {
    const dinnerTables = await this.repository.findAll();
    if (dinnerTables.length === 0) {
      throw new NotFoundException(`Dinner Tables not found`);
    }
    return dinnerTables;
  }

  async findOne(id: string): Promise<DinnerTable> {
    const dinnerTable = await this.repository.find(id);
    if (!dinnerTable) {
      throw new NotFoundException(`Dinner Table with ID ${id} not found`);
    }
    return dinnerTable;
  }

  async remove(id: string): Promise<RemoveResponse> {
    const dinnerTable = await this.findOne(id);
    await this.repository.remove(dinnerTable);
    return {
      success: true,
      message: `Dinner Table with ID ${id} removed successfuly`,
    };
  }

  async findBySeats(seats: number): Promise<DinnerTable> {
    const dinnerTables = await this.repository.findManyBySeats(seats);
    if (dinnerTables.length === 0) {
      throw new NotFoundException(
        `Not found any free Dinner Table with ${seats} seats`,
      );
    }
    let dinnerTable: DinnerTable;
    for (const table of dinnerTables) {
      if (table.seats === seats) {
        dinnerTable = table;
        break;
      }
      if (!dinnerTable || dinnerTable.seats > table.seats) {
        dinnerTable = table;
      }
    }
    return dinnerTable;
  }
}
